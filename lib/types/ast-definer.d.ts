import { Location, Range } from "./ast-common"

/**
 * The Type of AST definition.
 */
export interface ASTDefinition {
    /**
     * A map-like object type to define nodes.
     * 
     * Each key is the node type and its value is the node definition.
     * `Def.NodeRef<T>` in the node definitions will be replaced by the actual node types.
     */
    nodes: object

    /**
     * The union type of statement node types.
     * `Def.NodeRef<"Statement">` will be converted to the nodes of this type.
     */
    statementType: string
    
    /**
     * The union type of statement node types.
     * `Def.NodeRef<"Expression">` will be converted to the nodes of this type.
     */
    expressionType: string
}

/**
 * The difference to enhance AST definition.
 */
export type ASTEnhancement = Partial<ASTDefinition>

/**
 * The type to represent that a node has other nodes.
 */
export interface NodeRef<TType extends string> { $ref: TType }

//------------------------------------------------------------------------------
// Implement `Node<Type, ASTDefinition>`
//------------------------------------------------------------------------------

/**
 * Normalize a given node type.
 * 
 * There are three special types:
 * - `"Node"` ... becomes the union of all node types.
 * - `"Statement"` ... becomes the union of all statement node types.
 * - `"Expression"` ... becomes the union of all expression node types.
 */
type NormalizedType<TType, TDefinition extends ASTDefinition> =
    & string
    & (keyof TDefinition["nodes"])
    & (
        TType extends "Node" ? keyof TDefinition["nodes"] :
        TType extends "Statement" ? TDefinition["statementType"] :
        TType extends "Expression" ? TDefinition["expressionType"] :
        /* otherwise */ TType
    )

/**
 * Resolve given node types to the corresponded nodes.
 */
type ResolvedNodeWithoutNormalize<TType, TDefinition extends ASTDefinition> =
    TType extends string ? Node<TType, TDefinition> : never

/**
 * Resolve given node types to the corresponded nodes.
 */
type ResolvedNode<TType, TDefinition extends ASTDefinition> =
    ResolvedNodeWithoutNormalize<NormalizedType<TType, TDefinition>, TDefinition>

/**
 * Resolve given `Def.NodeRef<T>` to the corresponded nodes.
 * If a given type was not `Def.NodeRef<T>`, it's as-is.
 * If the reference was in a too nested place, resolves to `unknown`.
 */
type _ResolvedNodeRef<TMaybeNodeRef, TDefinition extends ASTDefinition> =
    TMaybeNodeRef extends { $ref: infer T }
        ? (T extends string ? ResolvedNode<T, TDefinition> : TMaybeNodeRef)
        : TMaybeNodeRef

/**
 * Resolve given `Def.NodeRef<T>` or `Def.NodeRef<T>[]` to the corresponded nodes.
 * If a given type was not `Def.NodeRef<T>`, it's as-is.
 * If the reference was in a too nested place, resolves to `unknown`.
 */
type ResolvedNodeRef<TMaybeNodeRef, TDefinition extends ASTDefinition> =
    TMaybeNodeRef extends (infer TElement)[]
        ? readonly _ResolvedNodeRef<TElement, TDefinition>[]
        : _ResolvedNodeRef<TMaybeNodeRef, TDefinition>

/**
 * Collect all referenced node types (`Def.NodeRef<T>`) in a given node definition.
 */
type ChildType<TType extends string, TDefinition extends ASTDefinition> =
    TDefinition["nodes"] extends { [P in TType]: infer TBody }
        ? NormalizedType<
            {
                [P in keyof TBody]: Extract<
                    | TBody[P] extends { $ref: infer TType } ? TType : never
                    | TBody[P] extends { $ref: infer TType }[] ? TType : never,
                    string
                >
            }[keyof TBody],
            TDefinition
        >
        : never

/**
 * Collect all node types which references to the given node.
 * This is used to calculate `parent` property of each node.
 */
type ParentType<TType extends string, TDefinition extends ASTDefinition> = {
    [P in (keyof TDefinition["nodes"]) & string]:
        TType extends ChildType<P, TDefinition> ? P : never
}[(keyof TDefinition["nodes"]) & string]

/**
 * Convert `never` to `null`. Otherwise, as-is.
 */
type NeverToNull<T> =
    false extends (T extends never ? true : false) ? T : null

/**
 * Collect all keys of all nodes.
 */
type AllNodeProperties<TDefinition extends ASTDefinition> = {
    [P in keyof TDefinition["nodes"]]: keyof TDefinition["nodes"][P]
}[keyof TDefinition["nodes"]]

/**
 * - Calculate `parent` property automatically.
 * - Add the common properties (`range`, `loc`).
 */
interface NodeCommonProperties<TType extends string, TDefinition extends ASTDefinition> {
    readonly range: Range
    readonly loc: Location
    readonly parent: NeverToNull<
        ResolvedNode<ParentType<TType, TDefinition>, TDefinition>
    >
}

/**
 * Define the actual node of the given node type.
 * - `TDefinition["nodes"][TType]` is the node definition.
 * - Resolve all `Def.NodeRef<T>`s in the node definition.
 * - Calculate `parent` property automatically.
 * - Add the common properties (`type`, `range`, `loc`).
 */
export type Node<TType extends string, TDefinition extends ASTDefinition> =
    TDefinition["nodes"] extends { [P in TType]: infer TBody }
        ? {
            readonly [P in "type" | keyof TBody]:
                P extends "type" ? (
                    TBody extends { type: infer OverridenType }
                        ? (OverridenType extends string ? OverridenType : TType)
                        : TType
                ) :
                P extends keyof TBody ? ResolvedNodeRef<TBody[P], TDefinition> :
                never
        } & NodeCommonProperties<TType, TDefinition>
        : unknown

/**
 * Define the union type of all nodes which have the given type.
 * 
 * There are three special types:
 * - `"Node"` ... becomes the union of all nodes.
 * - `"Statement"` ... becomes the union of all statement nodes.
 * - `"Expression"` ... becomes the union of all expression nodes.
 */
export type ExtractNode<
    TType extends string,
    TDefinition extends ASTDefinition
> = TType extends "Node" | "Statement" | "Expression"
        ? ResolvedNode<TType, TDefinition>
        : Extract<ResolvedNode<"Node", TDefinition>, { type: TType }>

//------------------------------------------------------------------------------
// Implement `Extends<ASTDefinition, ASTEnhancement>`
//------------------------------------------------------------------------------

type At0<T extends ASTEnhancement[]> =
    T extends [infer X, ...any[]] ? X : never
type At1<T extends ASTEnhancement[]> =
    T extends [any, infer X, ...any[]] ? X : never
type At2<T extends ASTEnhancement[]> =
    T extends [any, any, infer X, ...any[]] ? X : never
type At3<T extends ASTEnhancement[]> =
    T extends [any, any, any, infer X, ...any[]] ? X : never
type Shift4<T extends ASTEnhancement[]> =
    ((...x: T) => void) extends ((_0: any, _1: any, _2: any, _3: any, ...xs: infer XS) => void)
        ? XS
        : never

type Prop<TObject, TKey extends string | number | symbol, TExpected, TDefault> =
    [TObject] extends [{ [P in TKey]: infer TResult }]
        ? (TResult extends TExpected ? TResult : TDefault)
        : TDefault

/**
 * Convert `A[] | B[]` to `(A | B)[]`.
 */
type UniteArray<T> = [T] extends [any[]] ? T[0][] : T

/**
 * Merge the properties of a node definition from a base definition and four enhancements.
 */
type MergeNodeProperties<T, U, V, W, X> = {
    [P in keyof T | keyof U | keyof V | keyof W | keyof X]: UniteArray<
        | (P extends keyof T ? T[P] : never)
        | (P extends keyof U ? U[P] : never)
        | (P extends keyof V ? V[P] : never)
        | (P extends keyof W ? W[P] : never)
        | (P extends keyof X ? X[P] : never)
    >
}

/**
 * Merge every node definition from a base definition and four enhancements.
 */
type MergeNodes<T, U, V, W, X> = {
    [P in keyof T | keyof U | keyof V | keyof W | keyof X]: MergeNodeProperties<
        Prop<T, P, {}, {}>, 
        Prop<U, P, {}, {}>,
        Prop<V, P, {}, {}>,
        Prop<W, P, {}, {}>,
        Prop<X, P, {}, {}>
    >
}

/**
 * Apply enhancements to the base definition.
 * This applies four enhancements at a time because TypeScript's threshold of recursive error is small.
 */
type ExtendsRec<
    TDefinition,
    TEnhancement0,
    TEnhancement1,
    TEnhancement2,
    TEnhancement3,
    TRestEnhancements extends any[]
> = {
    statementType: 
        | Prop<TDefinition, "statementType", string, never>
        | Prop<TEnhancement0, "statementType", string, never>
        | Prop<TEnhancement1, "statementType", string, never>
        | Prop<TEnhancement2, "statementType", string, never>
        | Prop<TEnhancement3, "statementType", string, never>
    expressionType:
        | Prop<TDefinition, "expressionType", string, never>
        | Prop<TEnhancement0, "expressionType", string, never>
        | Prop<TEnhancement1, "expressionType", string, never>
        | Prop<TEnhancement2, "expressionType", string, never>
        | Prop<TEnhancement3, "expressionType", string, never>
    nodes: MergeNodes<
        Prop<TDefinition, "nodes", {}, {}>,
        Prop<TEnhancement0, "nodes", {}, {}>,
        Prop<TEnhancement1, "nodes", {}, {}>,
        Prop<TEnhancement2, "nodes", {}, {}>,
        Prop<TEnhancement3, "nodes", {}, {}>
    >
} extends infer TRet
    ? {
        0: TRet
        1: ExtendsRec<
            TRet,
            At0<TRestEnhancements>,
            At1<TRestEnhancements>,
            At2<TRestEnhancements>,
            At3<TRestEnhancements>,
            Shift4<TRestEnhancements>
        >
    }[TRestEnhancements extends [] ? 0 : 1]
    : never

/**
 * Apply one or more enhancements to the base definition.
 */
export type Extends<
    TDefinition extends ASTDefinition,
    TEnhancement extends ASTEnhancement | ASTEnhancement[]
> = TEnhancement extends ASTEnhancement[]
    ? ExtendsRec<
        TDefinition, 
        At0<TEnhancement>, 
        At1<TEnhancement>, 
        At2<TEnhancement>, 
        At3<TEnhancement>, 
        Shift4<TEnhancement>
    >
    : ExtendsRec<TDefinition, TEnhancement, {}, {}, {}, []>
