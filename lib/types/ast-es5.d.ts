import { Comment, Token } from "./ast-common"
import * as Def from "./ast-definer"

export * from "./ast-common"

//------------------------------------------------------------------------------
// Definition
//------------------------------------------------------------------------------

export interface ASTDefinition {
    nodes: {
        // Root
        Program: {
            body: Def.NodeRef<"Statement">[]
            comments: Comment[]
            tokens: Token[]
        }

        // Statements
        BlockStatement: {
            body: Def.NodeRef<"Statement">[]
        }
        BreakStatement: {
            label: Def.NodeRef<"Identifier"> | null
        }
        ContinueStatement: {
            label: Def.NodeRef<"Identifier"> | null
        }
        DebuggerStatement: {
        }
        DoWhileStatement: {
            body: Def.NodeRef<"Statement">
            test: Def.NodeRef<"Expression">
        }
        EmptyStatement: {
        }
        ExpressionStatement: {
            expression: Def.NodeRef<"Expression">
        }
        ForInStatement: {
            left:
                | Def.NodeRef<"Identifier">
                | Def.NodeRef<"BasicMemberExpression">
                | Def.NodeRef<"ComputedMemberExpression">
                | Def.NodeRef<"VariableDeclaration">
            right: Def.NodeRef<"Expression">
            body: Def.NodeRef<"Statement">
        }
        ForStatement: {
            init:
                | Def.NodeRef<"VariableDeclaration">
                | Def.NodeRef<"Expression">
                | null
            test: Def.NodeRef<"Expression"> | null
            update: Def.NodeRef<"Expression"> | null
            body: Def.NodeRef<"Statement">
        }
        FunctionDeclaration: {
            id: Def.NodeRef<"Identifier">
            params: Def.NodeRef<"Identifier">[]
            body: Def.NodeRef<"BlockStatement">
        }
        IfStatement: {
            test: Def.NodeRef<"Expression">
            consequent: Def.NodeRef<"Statement">
            alternate: Def.NodeRef<"Statement"> | null
        }
        LabeledStatement: {
            label: Def.NodeRef<"Identifier">
            body: Def.NodeRef<"Statement">
        }
        ReturnStatement: {
            argument: Def.NodeRef<"Expression"> | null
        }
        SwitchStatement: {
            discriminant: Def.NodeRef<"Expression">
            cases: Def.NodeRef<"SwitchCase">[]
        }
        ThrowStatement: {
            argument: Def.NodeRef<"Expression">
        }
        TryStatement: {
            block: Def.NodeRef<"BlockStatement">
            handler: Def.NodeRef<"CatchClause"> | null
            finalizer: Def.NodeRef<"BlockStatement"> | null
        }
        VariableDeclaration: {
            declarations: Def.NodeRef<"VariableDeclarator">[]
        }
        WhileStatement: {
            test: Def.NodeRef<"Expression">
            body: Def.NodeRef<"Statement">
        }
        WithStatement: {
            object: Def.NodeRef<"Expression">
            body: Def.NodeRef<"Statement">
        }

        // Expressions
        ArrayExpression: {
            elements: (Def.NodeRef<"Expression"> | null)[]
        }
        AssignmentExpression: {
            operator:
                | "=" | "+=" | "-=" | "*=" | "/=" | "%="
                | "<<=" | ">>=" | ">>>=" | "|=" | "^=" | "&="
            left:
                | Def.NodeRef<"Identifier">
                | Def.NodeRef<"BasicMemberExpression">
                | Def.NodeRef<"ComputedMemberExpression">
            right: Def.NodeRef<"Expression">
        }
        BinaryExpression: {
            operator: 
                | "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">="
                | "<<" | ">>" | ">>>" | "|" | "^" | "&"
                | "+" | "-" | "*" | "/" | "%"
                | "in" | "instanceof"
            left: Def.NodeRef<"Expression">
            right: Def.NodeRef<"Expression">
        }
        BooleanLiteral: {
            type: "Literal"
            value: boolean
            regex: undefined
        }
        CallExpression: {
            callee: Def.NodeRef<"Expression">
            arguments: Def.NodeRef<"Expression">[]
        }
        ConditionalExpression: {
            test: Def.NodeRef<"Expression">
            alternate: Def.NodeRef<"Expression">
            consequent: Def.NodeRef<"Expression">
        }
        FunctionExpression: {
            id: Def.NodeRef<"Identifier"> | null
            params: Def.NodeRef<"Identifier">[]
            body: Def.NodeRef<"BlockStatement">
        }
        Identifier: {
            name: string
        }
        LogicalExpression: {
            operator: "||" | "&&"
            left: Def.NodeRef<"Expression">
            right: Def.NodeRef<"Expression">
        }
        BasicMemberExpression: {
            type: "MemberExpression"
            computed: false
            object: Def.NodeRef<"Expression">
            property: Def.NodeRef<"Identifier">
        }
        ComputedMemberExpression: {
            type: "MemberExpression"
            computed: true
            object: Def.NodeRef<"Expression">
            property: Def.NodeRef<"Expression">
        }
        NewExpression: {
            callee: Def.NodeRef<"Expression">
            arguments: Def.NodeRef<"Expression">[]
        }
        NullLiteral: {
            type: "Literal"
            value: null
            regex: undefined
        }
        NumberLiteral: {
            type: "Literal"
            value: number
            regex: undefined
        }
        ObjectExpression: {
            properties: (
                | Def.NodeRef<"BasicProperty">
                | Def.NodeRef<"AccessorProperty">
            )[]
        }
        RegExpLiteral: {
            type: "Literal"
            value: RegExp
            regex: { pattern: string; flags: string }
        }
        SequenceExpression: {
            expressions: Def.NodeRef<"Expression">[]
        }
        StringLiteral: {
            type: "Literal"
            value: string
            regex: undefined
        }
        ThisExpression: {
        }
        UnaryExpression: {
            operator: "-" | "+" | "!" | "~" | "typeof" | "void" | "delete"
            prefix: boolean
            argument: Def.NodeRef<"Expression">
        }
        UpdateExpression: {
            operator: "++" | "--"
            argument:
                | Def.NodeRef<"Identifier">
                | Def.NodeRef<"BasicMemberExpression">
                | Def.NodeRef<"ComputedMemberExpression">
            prefix: boolean
        }

        // Others
        CatchClause: {
            param: Def.NodeRef<"Identifier">
            body: Def.NodeRef<"BlockStatement">
        }
        BasicProperty: {
            type: "Property"
            kind: "init"
            key:
                | Def.NodeRef<"Identifier">
                | Def.NodeRef<"NumberLiteral">
                | Def.NodeRef<"StringLiteral">
            value: Def.NodeRef<"Expression">
        }
        AccessorProperty: {
            type: "Property"
            kind: "get" | "set"
            key:
                | Def.NodeRef<"Identifier">
                | Def.NodeRef<"NumberLiteral">
                | Def.NodeRef<"StringLiteral">
            value: Def.NodeRef<"FunctionExpression">
        }
        SwitchCase: {
            test: Def.NodeRef<"Expression"> | null
            consequent: Def.NodeRef<"Statement">[]
        }
        VariableDeclarator: {
            id: Def.NodeRef<"Identifier">
            init: Def.NodeRef<"Expression"> | null
        }
    },

    statementType:
        | "BlockStatement"
        | "BreakStatement"
        | "ContinueStatement"
        | "DebuggerStatement"
        | "DoWhileStatement"
        | "EmptyStatement"
        | "ExpressionStatement"
        | "ForInStatement"
        | "ForStatement"
        | "FunctionDeclaration"
        | "IfStatement"
        | "LabeledStatement"
        | "ReturnStatement"
        | "SwitchStatement"
        | "ThrowStatement"
        | "TryStatement"
        | "VariableDeclaration"
        | "WhileStatement"
        | "WithStatement"

    expressionType:
        | "ArrayExpression"
        | "AssignmentExpression"
        | "BinaryExpression"
        | "BooleanLiteral"
        | "CallExpression"
        | "ConditionalExpression"
        | "FunctionExpression"
        | "Identifier"
        | "LogicalExpression"
        | "BasicMemberExpression"
        | "ComputedMemberExpression"
        | "NewExpression"
        | "NullLiteral"
        | "NumberLiteral"
        | "ObjectExpression"
        | "RegExpLiteral"
        | "SequenceExpression"
        | "StringLiteral"
        | "ThisExpression"
        | "UnaryExpression"
        | "UpdateExpression"
}

//------------------------------------------------------------------------------
// Unions
//------------------------------------------------------------------------------

export type Node<T extends string = "Node"> = Def.ExtractNode<T, ASTDefinition>

//------------------------------------------------------------------------------
// Root
//------------------------------------------------------------------------------

export interface Program extends Def.Node<"Program", ASTDefinition> {}

//------------------------------------------------------------------------------
// Statements
//------------------------------------------------------------------------------

export interface BlockStatement extends Def.Node<"BlockStatement", ASTDefinition> {}
export interface BreakStatement extends Def.Node<"BreakStatement", ASTDefinition> {}
export interface ContinueStatement extends Def.Node<"ContinueStatement", ASTDefinition> {}
export interface DebuggerStatement extends Def.Node<"DebuggerStatement", ASTDefinition> {}
export interface DoWhileStatement extends Def.Node<"DoWhileStatement", ASTDefinition> {}
export interface EmptyStatement extends Def.Node<"EmptyStatement", ASTDefinition> {}
export interface ExpressionStatement extends Def.Node<"ExpressionStatement", ASTDefinition> {}
export interface ForInStatement extends Def.Node<"ForInStatement", ASTDefinition> {}
export interface ForStatement extends Def.Node<"ForStatement", ASTDefinition> {}
export interface FunctionDeclaration extends Def.Node<"FunctionDeclaration", ASTDefinition> {}
export interface IfStatement extends Def.Node<"IfStatement", ASTDefinition> {}
export interface LabeledStatement extends Def.Node<"LabeledStatement", ASTDefinition> {}
export interface ReturnStatement extends Def.Node<"ReturnStatement", ASTDefinition> {}
export interface SwitchStatement extends Def.Node<"SwitchStatement", ASTDefinition> {}
export interface ThrowStatement extends Def.Node<"ThrowStatement", ASTDefinition> {}
export interface TryStatement extends Def.Node<"TryStatement", ASTDefinition> {}
export interface VariableDeclaration extends Def.Node<"VariableDeclaration", ASTDefinition> {}
export interface WhileStatement extends Def.Node<"WhileStatement", ASTDefinition> {}
export interface WithStatement extends Def.Node<"WithStatement", ASTDefinition> {}

//------------------------------------------------------------------------------
// Expressions
//------------------------------------------------------------------------------

export interface ArrayExpression extends Def.Node<"ArrayExpression", ASTDefinition> {}
export interface AssignmentExpression extends Def.Node<"AssignmentExpression", ASTDefinition> {}
export interface BasicMemberExpression extends Def.Node<"BasicMemberExpression", ASTDefinition> {}
export interface BinaryExpression extends Def.Node<"BinaryExpression", ASTDefinition> {}
export interface BooleanLiteral extends Def.Node<"BooleanLiteral", ASTDefinition> {}
export interface CallExpression extends Def.Node<"CallExpression", ASTDefinition> {}
export interface ComputedMemberExpression extends Def.Node<"ComputedMemberExpression", ASTDefinition> {}
export interface ConditionalExpression extends Def.Node<"ConditionalExpression", ASTDefinition> {}
export interface FunctionExpression extends Def.Node<"FunctionExpression", ASTDefinition> {}
export interface Identifier extends Def.Node<"Identifier", ASTDefinition> {}
export interface LogicalExpression extends Def.Node<"LogicalExpression", ASTDefinition> {}
export interface NewExpression extends Def.Node<"NewExpression", ASTDefinition> {}
export interface NullLiteral extends Def.Node<"NullLiteral", ASTDefinition> {}
export interface NumberLiteral extends Def.Node<"NumberLiteral", ASTDefinition> {}
export interface ObjectExpression extends Def.Node<"ObjectExpression", ASTDefinition> {}
export interface RegExpLiteral extends Def.Node<"RegExpLiteral", ASTDefinition> {}
export interface SequenceExpression extends Def.Node<"SequenceExpression", ASTDefinition> {}
export interface StringLiteral extends Def.Node<"StringLiteral", ASTDefinition> {}
export interface ThisExpression extends Def.Node<"ThisExpression", ASTDefinition> {}
export interface UnaryExpression extends Def.Node<"UnaryExpression", ASTDefinition> {}
export interface UpdateExpression extends Def.Node<"UpdateExpression", ASTDefinition> {}

//------------------------------------------------------------------------------
// Others
//------------------------------------------------------------------------------

export interface AccessorProperty extends Def.Node<"AccessorProperty", ASTDefinition> {}
export interface BasicProperty extends Def.Node<"BasicProperty", ASTDefinition> {}
export interface CatchClause extends Def.Node<"CatchClause", ASTDefinition> {}
export interface SwitchCase extends Def.Node<"SwitchCase", ASTDefinition> {}
export interface VariableDeclarator extends Def.Node<"VariableDeclarator", ASTDefinition> {}
