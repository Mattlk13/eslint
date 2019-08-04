import { Def, ES2019 } from "../../types/ast"
import { Rule, RuleContext, RuleMeta } from "../../types/rule"
import { Schema } from "../../types/schema"
import * as scope from "../../types/scope"

export * from "../../types/ast-common"
export * from "../../types/code-path"

// Enhancement AST to not crash on Stage 3 syntaxes.
interface ASTDefinition extends Def.Extends<
    ES2019.ASTDefinition,
    {
        nodes: {}
    }
> {}

export type ScopeManager = scope.ScopeManager<Node>
export type Scope = scope.Scope<Node>
export type Variable = scope.Variable<Node>
export type Reference = scope.Reference<Node>
export type VariableDefinition = scope.Definition<Node>

export type RuleContext = RuleContext<Node, any, any>

export declare function rule<TMeta extends RuleMeta>(
    rule: Rule<Node, TMeta>
): Rule<Node, TMeta>


//------------------------------------------------------------------------------
// Unions
//------------------------------------------------------------------------------

type AllNode =
    | ModuleProgram
    | ScriptProgram
    | ExportAllDeclaration
    | ExportDefaultDeclaration
    | ExportNamedFromDeclaration
    | ExportNamedDeclaration
    | ImportDeclaration
    | BlockStatement
    | BreakStatement
    | BasicClassDeclaration
    | ContinueStatement
    | DebuggerStatement
    | DoWhileStatement
    | EmptyStatement
    | ExpressionStatement
    | ForInStatement
    | ForOfStatement
    | ForStatement
    | BasicFunctionDeclaration
    | IfStatement
    | LabeledStatement
    | ReturnStatement
    | SwitchStatement
    | ThrowStatement
    | TryStatement
    | VariableDeclaration
    | WhileStatement
    | WithStatement
    | ArrayExpression
    | ArrowFunctionExpression
    | AssignmentExpression
    | AwaitExpression
    | BinaryExpression
    | BooleanLiteral
    | CallExpression
    | ClassExpression
    | ComputedMemberExpression
    | ConditionalExpression
    | FunctionExpression
    | Identifier
    | LogicalExpression
    | BasicMemberExpression
    | MetaProperty
    | NewExpression
    | NullLiteral
    | NumberLiteral
    | ObjectExpression
    | RegExpLiteral
    | SequenceExpression
    | StringLiteral
    | TaggedTemplateExpression
    | TemplateLiteral
    | ThisExpression
    | UnaryExpression
    | UpdateExpression
    | YieldExpression
    | AccessorProperty
    | AnonymousDefaultExportedClassDeclaration
    | AnonymousDefaultExportedFunctionDeclaration
    | AssignmentArrayPattern
    | AssignmentAssignmentPattern
    | AssignmentComputedProperty
    | AssignmentObjectPattern
    | AssignmentProperty
    | AssignmentRestElement
    | AssignmentShorthandProperty
    | BindingArrayPattern
    | BindingAssignmentPattern
    | BindingComputedProperty
    | BindingObjectPattern
    | BindingProperty
    | BindingRestElement
    | BindingShorthandProperty
    | CatchClause
    | ClassBody
    | ComputedAccessorProperty
    | ComputedMethodDefinition
    | ComputedMethodProperty
    | ComputedProperty
    | ConstructorDefinition
    | ExportSpecifier
    | ImportDefaultSpecifier
    | ImportNamespaceSpecifier
    | ImportSpecifier
    | BasicMethodDefinition
    | MethodProperty
    | BasicProperty
    | ShorthandProperty
    | SpreadElement
    | Super
    | SwitchCase
    | TemplateElement
    | VariableDeclarator

export type Node<T extends string | null = null> =
    T extends string
        ? Extract<AllNode, { type: T }>
        : AllNode

export type Statement =
    | BlockStatement
    | BreakStatement
    | BasicClassDeclaration
    | ContinueStatement
    | DebuggerStatement
    | DoWhileStatement
    | EmptyStatement
    | ExpressionStatement
    | ForInStatement
    | ForOfStatement
    | ForStatement
    | BasicFunctionDeclaration
    | IfStatement
    | LabeledStatement
    | ReturnStatement
    | SwitchStatement
    | ThrowStatement
    | TryStatement
    | VariableDeclaration
    | WhileStatement
    | WithStatement

export type Expression =
    | ArrayExpression
    | ArrowFunctionExpression
    | AssignmentExpression
    | AwaitExpression
    | BinaryExpression
    | BooleanLiteral
    | CallExpression
    | ClassExpression
    | ComputedMemberExpression
    | ConditionalExpression
    | FunctionExpression
    | Identifier
    | LogicalExpression
    | BasicMemberExpression
    | MetaProperty
    | NewExpression
    | NullLiteral
    | NumberLiteral
    | ObjectExpression
    | RegExpLiteral
    | SequenceExpression
    | StringLiteral
    | TaggedTemplateExpression
    | TemplateLiteral
    | ThisExpression
    | UnaryExpression
    | UpdateExpression
    | YieldExpression

//------------------------------------------------------------------------------
// Root
//------------------------------------------------------------------------------

export interface ModuleProgram extends Def.Node<"ModuleProgram", ASTDefinition> {}
export interface ScriptProgram extends Def.Node<"Program", ASTDefinition> {}

//------------------------------------------------------------------------------
// Modules
//------------------------------------------------------------------------------

export interface ExportAllDeclaration extends Def.Node<"ExportAllDeclaration", ASTDefinition> {}
export interface ExportDefaultDeclaration extends Def.Node<"ExportDefaultDeclaration", ASTDefinition> {}
export interface ExportNamedFromDeclaration extends Def.Node<"ExportNamedFromDeclaration", ASTDefinition> {}
export interface ExportNamedDeclaration extends Def.Node<"ExportNamedDeclaration", ASTDefinition> {}
export interface ImportDeclaration extends Def.Node<"ImportDeclaration", ASTDefinition> {}

//------------------------------------------------------------------------------
// Statements
//------------------------------------------------------------------------------

export interface BlockStatement extends Def.Node<"BlockStatement", ASTDefinition> {}
export interface BreakStatement extends Def.Node<"BreakStatement", ASTDefinition> {}
export interface BasicClassDeclaration extends Def.Node<"ClassDeclaration", ASTDefinition> {}
export interface ContinueStatement extends Def.Node<"ContinueStatement", ASTDefinition> {}
export interface DebuggerStatement extends Def.Node<"DebuggerStatement", ASTDefinition> {}
export interface DoWhileStatement extends Def.Node<"DoWhileStatement", ASTDefinition> {}
export interface EmptyStatement extends Def.Node<"EmptyStatement", ASTDefinition> {}
export interface ExpressionStatement extends Def.Node<"ExpressionStatement", ASTDefinition> {}
export interface ForInStatement extends Def.Node<"ForInStatement", ASTDefinition> {}
export interface ForOfStatement extends Def.Node<"ForOfStatement", ASTDefinition> {}
export interface ForStatement extends Def.Node<"ForStatement", ASTDefinition> {}
export interface BasicFunctionDeclaration extends Def.Node<"FunctionDeclaration", ASTDefinition> {}
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
export interface ArrowFunctionExpression extends Def.Node<"ArrowFunctionExpression", ASTDefinition> {}
export interface AssignmentExpression extends Def.Node<"AssignmentExpression", ASTDefinition> {}
export interface AwaitExpression extends Def.Node<"AwaitExpression", ASTDefinition> {}
export interface BinaryExpression extends Def.Node<"BinaryExpression", ASTDefinition> {}
export interface BooleanLiteral extends Def.Node<"BooleanLiteral", ASTDefinition> {}
export interface CallExpression extends Def.Node<"CallExpression", ASTDefinition> {}
export interface ClassExpression extends Def.Node<"ClassExpression", ASTDefinition> {}
export interface ComputedMemberExpression extends Def.Node<"ComputedMemberExpression", ASTDefinition> {}
export interface ConditionalExpression extends Def.Node<"ConditionalExpression", ASTDefinition> {}
export interface FunctionExpression extends Def.Node<"FunctionExpression", ASTDefinition> {}
export interface Identifier extends Def.Node<"Identifier", ASTDefinition> {}
export interface LogicalExpression extends Def.Node<"LogicalExpression", ASTDefinition> {}
export interface BasicMemberExpression extends Def.Node<"BasicMemberExpression", ASTDefinition> {}
export interface MetaProperty extends Def.Node<"MetaProperty", ASTDefinition> {}
export interface NewExpression extends Def.Node<"NewExpression", ASTDefinition> {}
export interface NullLiteral extends Def.Node<"NullLiteral", ASTDefinition> {}
export interface NumberLiteral extends Def.Node<"NumberLiteral", ASTDefinition> {}
export interface ObjectExpression extends Def.Node<"ObjectExpression", ASTDefinition> {}
export interface RegExpLiteral extends Def.Node<"RegExpLiteral", ASTDefinition> {}
export interface SequenceExpression extends Def.Node<"SequenceExpression", ASTDefinition> {}
export interface StringLiteral extends Def.Node<"StringLiteral", ASTDefinition> {}
export interface TaggedTemplateExpression extends Def.Node<"TaggedTemplateExpression", ASTDefinition> {}
export interface TemplateLiteral extends Def.Node<"TemplateLiteral", ASTDefinition> {}
export interface ThisExpression extends Def.Node<"ThisExpression", ASTDefinition> {}
export interface UnaryExpression extends Def.Node<"UnaryExpression", ASTDefinition> {}
export interface UpdateExpression extends Def.Node<"UpdateExpression", ASTDefinition> {}
export interface YieldExpression extends Def.Node<"YieldExpression", ASTDefinition> {}

//------------------------------------------------------------------------------
// Others
//------------------------------------------------------------------------------

export interface AccessorProperty extends Def.Node<"AccessorProperty", ASTDefinition> {}
export interface AnonymousDefaultExportedClassDeclaration extends Def.Node<"AnonymousDefaultExportedClassDeclaration", ASTDefinition> {}
export interface AnonymousDefaultExportedFunctionDeclaration extends Def.Node<"AnonymousDefaultExportedFunctionDeclaration", ASTDefinition> {}
export interface AssignmentArrayPattern extends Def.Node<"AssignmentArrayPattern", ASTDefinition> {}
export interface AssignmentAssignmentPattern extends Def.Node<"AssignmentAssignmentPattern", ASTDefinition> {}
export interface AssignmentComputedProperty extends Def.Node<"AssignmentComputedProperty", ASTDefinition> {}
export interface AssignmentObjectPattern extends Def.Node<"AssignmentObjectPattern", ASTDefinition> {}
export interface AssignmentProperty extends Def.Node<"AssignmentProperty", ASTDefinition> {}
export interface AssignmentRestElement extends Def.Node<"AssignmentRestElement", ASTDefinition> {}
export interface AssignmentShorthandProperty extends Def.Node<"AssignmentShorthandProperty", ASTDefinition> {}
export interface BindingArrayPattern extends Def.Node<"BindingArrayPattern", ASTDefinition> {}
export interface BindingAssignmentPattern extends Def.Node<"BindingAssignmentPattern", ASTDefinition> {}
export interface BindingComputedProperty extends Def.Node<"BindingComputedProperty", ASTDefinition> {}
export interface BindingObjectPattern extends Def.Node<"BindingObjectPattern", ASTDefinition> {}
export interface BindingProperty extends Def.Node<"BindingProperty", ASTDefinition> {}
export interface BindingRestElement extends Def.Node<"BindingRestElement", ASTDefinition> {}
export interface BindingShorthandProperty extends Def.Node<"BindingShorthandProperty", ASTDefinition> {}
export interface CatchClause extends Def.Node<"CatchClause", ASTDefinition> {}
export interface ClassBody extends Def.Node<"ClassBody", ASTDefinition> {}
export interface ComputedAccessorProperty extends Def.Node<"ComputedAccessorProperty", ASTDefinition> {}
export interface ComputedMethodDefinition extends Def.Node<"ComputedMethodDefinition", ASTDefinition> {}
export interface ComputedMethodProperty extends Def.Node<"ComputedMethodProperty", ASTDefinition> {}
export interface ComputedProperty extends Def.Node<"ComputedProperty", ASTDefinition> {}
export interface ConstructorDefinition extends Def.Node<"ConstructorDefinition", ASTDefinition> {}
export interface ExportSpecifier extends Def.Node<"ExportSpecifier", ASTDefinition> {}
export interface ImportDefaultSpecifier extends Def.Node<"ImportDefaultSpecifier", ASTDefinition> {}
export interface ImportNamespaceSpecifier extends Def.Node<"ImportNamespaceSpecifier", ASTDefinition> {}
export interface ImportSpecifier extends Def.Node<"ImportSpecifier", ASTDefinition> {}
export interface BasicMethodDefinition extends Def.Node<"MethodDefinition", ASTDefinition> {}
export interface MethodProperty extends Def.Node<"MethodProperty", ASTDefinition> {}
export interface BasicProperty extends Def.Node<"BasicProperty", ASTDefinition> {}
export interface ShorthandProperty extends Def.Node<"ShorthandProperty", ASTDefinition> {}
export interface SpreadElement extends Def.Node<"SpreadElement", ASTDefinition> {}
export interface Super extends Def.Node<"Super", ASTDefinition> {}
export interface SwitchCase extends Def.Node<"SwitchCase", ASTDefinition> {}
export interface TemplateElement extends Def.Node<"TemplateElement", ASTDefinition> {}
export interface VariableDeclarator extends Def.Node<"VariableDeclarator", ASTDefinition> {}
