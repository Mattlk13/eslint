import { Comment, Token } from "./ast-common"
import * as es5 from "./ast-es5"
import * as Def from "./ast-definer"

export * from "./ast-common"

//------------------------------------------------------------------------------
// Definition
//------------------------------------------------------------------------------

export namespace ASTEnhancements {
    export interface ArrowFunction {
        nodes: {
            // New expressions
            ArrowFunctionExpression: {
                id: Def.NodeRef<"Identifier"> | null
                params: (
                    | Def.NodeRef<"BindingArrayPattern">
                    | Def.NodeRef<"BindingAssignmentPattern">
                    | Def.NodeRef<"BindingObjectPattern">
                    | Def.NodeRef<"BindingRestElement">
                    | Def.NodeRef<"Identifier">
                )[]
                body:
                    | Def.NodeRef<"BlockStatement">
                    | Def.NodeRef<"Expression">
            }
        },
        expressionType: "ArrowFunctionExpression"
    }

    export interface Class {
        nodes: {
            // Enhancements
            CallExpression: {
                callee: Def.NodeRef<"Super">
            }
            BasicMemberExpression: {
                object: Def.NodeRef<"Super">
            }
            ComputedMemberExpression: {
                object: Def.NodeRef<"Super">
            }

            // New statements
            ClassDeclaration: {
                id: Def.NodeRef<"Identifier">
                superClass: Def.NodeRef<"Expression"> | null
                body: Def.NodeRef<"ClassBody">
            }

            // New expressions
            ClassExpression: {
                id: Def.NodeRef<"Identifier"> | null
                superClass: Def.NodeRef<"Expression"> | null
                body: Def.NodeRef<"ClassBody">
            }
            MetaProperty: {
                meta: Def.NodeRef<"Identifier">
                property: Def.NodeRef<"Identifier">
            }

            // New others
            ClassBody: {
                body: (
                    | Def.NodeRef<"ComputedMethodDefinition">
                    | Def.NodeRef<"ConstructorDefinition">
                    | Def.NodeRef<"MethodDefinition">
                )[]
            }
            MethodDefinition: {
                computed: false
                kind: "method" | "get" | "set"
                static: boolean
                key:
                    | Def.NodeRef<"Identifier">
                    | Def.NodeRef<"NumberLiteral">
                    | Def.NodeRef<"StringLiteral">
                value: Def.NodeRef<"FunctionExpression">
            }
            ConstructorDefinition: {
                type: "MethodDefinition"
                computed: false
                kind: "constructor"
                static: false
                key: Def.NodeRef<"Identifier"> | Def.NodeRef<"StringLiteral">
                value: Def.NodeRef<"FunctionExpression">
            }
            ComputedMethodDefinition: {
                type: "MethodDefinition"
                computed: true
                kind: "method" | "get" | "set"
                static: boolean
                key: Def.NodeRef<"Expression">
                value: Def.NodeRef<"FunctionExpression">
            }
            Super: {}
        }
        statementType: "ClassDeclaration"
        expressionType: "ClassExpression" | "MetaProperty"
    }

    interface DestructuringAssignment {
        nodes: {
            // Enhancements
            ForInStatement: {
                left:
                    | Def.NodeRef<"AssignmentArrayPattern">
                    | Def.NodeRef<"AssignmentObjectPattern">
            }
            AssignmentExpression: {
                left:
                    | Def.NodeRef<"AssignmentArrayPattern">
                    | Def.NodeRef<"AssignmentObjectPattern">
            }

            // New others
            AssignmentArrayPattern: {
                type: "ArrayPattern"
                elements: (
                    | Def.NodeRef<"AssignmentArrayPattern">
                    | Def.NodeRef<"AssignmentAssignmentPattern">
                    | Def.NodeRef<"AssignmentObjectPattern">
                    | Def.NodeRef<"AssignmentRestElement">
                    | Def.NodeRef<"BasicMemberExpression">
                    | Def.NodeRef<"ComputedMemberExpression">
                    | Def.NodeRef<"Identifier">
                    | null
                )[]
            }
            AssignmentAssignmentPattern: {
                type: "AssignmentPattern"
                left:
                    | Def.NodeRef<"AssignmentArrayPattern">
                    | Def.NodeRef<"AssignmentObjectPattern">
                    | Def.NodeRef<"BasicMemberExpression">
                    | Def.NodeRef<"ComputedMemberExpression">
                    | Def.NodeRef<"Identifier">
                right: Def.NodeRef<"Expression">
            }
            AssignmentProperty: {
                type: "Property"
                kind: "init"
                computed: false
                method: false
                shorthand: false
                key:
                    | Def.NodeRef<"Identifier">
                    | Def.NodeRef<"NumberLiteral">
                    | Def.NodeRef<"StringLiteral">
                value:
                    | Def.NodeRef<"AssignmentArrayPattern">
                    | Def.NodeRef<"AssignmentAssignmentPattern">
                    | Def.NodeRef<"AssignmentObjectPattern">
                    | Def.NodeRef<"Identifier">
                    | Def.NodeRef<"BasicMemberExpression">
                    | Def.NodeRef<"ComputedMemberExpression">
            }
            AssignmentShorthandProperty: {
                type: "Property"
                kind: "init"
                computed: false
                method: false
                shorthand: true
                key: Def.NodeRef<"Identifier">
                value: Def.NodeRef<"Identifier">
            }
            AssignmentComputedProperty: {
                type: "Property"
                kind: "init"
                computed: true
                method: false
                shorthand: false
                key: Def.NodeRef<"Expression">
                value:
                    | Def.NodeRef<"AssignmentArrayPattern">
                    | Def.NodeRef<"AssignmentAssignmentPattern">
                    | Def.NodeRef<"AssignmentObjectPattern">
                    | Def.NodeRef<"Identifier">
                    | Def.NodeRef<"BasicMemberExpression">
                    | Def.NodeRef<"ComputedMemberExpression">
            }
            AssignmentObjectPattern: {
                type: "ObjectPattern"
                properties: (
                    | Def.NodeRef<"AssignmentComputedProperty">
                    | Def.NodeRef<"AssignmentProperty">
                    | Def.NodeRef<"AssignmentShorthandProperty">
                )[]
            }
            AssignmentRestElement: {
                type: "RestElement"
                argument:
                    | Def.NodeRef<"AssignmentArrayPattern">
                    | Def.NodeRef<"AssignmentObjectPattern">
                    | Def.NodeRef<"Identifier">
                    | Def.NodeRef<"BasicMemberExpression">
                    | Def.NodeRef<"ComputedMemberExpression">
            }
        }
    }
    
    interface DestructuringBinding {
        nodes: {
            // Enhancements
            CatchClause: {
                param:
                    | Def.NodeRef<"BindingArrayPattern">
                    | Def.NodeRef<"BindingObjectPattern">
            }
            FunctionDeclaration: {
                params: (
                    | Def.NodeRef<"BindingArrayPattern">
                    | Def.NodeRef<"BindingAssignmentPattern">
                    | Def.NodeRef<"BindingObjectPattern">
                    | Def.NodeRef<"BindingRestElement">
                )[]
            }
            FunctionExpression: {
                params: (
                    | Def.NodeRef<"BindingArrayPattern">
                    | Def.NodeRef<"BindingAssignmentPattern">
                    | Def.NodeRef<"BindingObjectPattern">
                    | Def.NodeRef<"BindingRestElement">
                )[]
            }
            VariableDeclarator: {
                id:
                    | Def.NodeRef<"BindingArrayPattern">
                    | Def.NodeRef<"BindingObjectPattern">
            }

            // Others
            BindingArrayPattern: {
                type: "ArrayPattern"
                elements: (
                    | Def.NodeRef<"BindingAssignmentPattern">
                    | Def.NodeRef<"BindingArrayPattern">
                    | Def.NodeRef<"BindingObjectPattern">
                    | Def.NodeRef<"BindingRestElement">
                    | Def.NodeRef<"Identifier">
                    | null
                )[]
            }
            BindingAssignmentPattern: {
                type: "AssignmentPattern"
                left:
                    | Def.NodeRef<"BindingArrayPattern">
                    | Def.NodeRef<"BindingObjectPattern">
                    | Def.NodeRef<"Identifier">
                right: Def.NodeRef<"Expression">
            }
            BindingProperty: {
                type: "Property"
                kind: "init"
                computed: false
                method: false
                shorthand: false
                key:
                    | Def.NodeRef<"Identifier">
                    | Def.NodeRef<"NumberLiteral">
                    | Def.NodeRef<"StringLiteral">
                value:
                    | Def.NodeRef<"BindingArrayPattern">
                    | Def.NodeRef<"BindingAssignmentPattern">
                    | Def.NodeRef<"BindingObjectPattern">
                    | Def.NodeRef<"Identifier">
            }
            BindingShorthandProperty: {
                type: "Property"
                kind: "init"
                computed: false
                method: false
                shorthand: true
                key: Def.NodeRef<"Identifier">
                value: Def.NodeRef<"Identifier">
            }
            BindingComputedProperty: {
                type: "Property"
                kind: "init"
                computed: true
                method: false
                shorthand: false
                key: Def.NodeRef<"Expression">
                value:
                    | Def.NodeRef<"BindingArrayPattern">
                    | Def.NodeRef<"BindingAssignmentPattern">
                    | Def.NodeRef<"BindingObjectPattern">
                    | Def.NodeRef<"Identifier">
            }
            BindingObjectPattern: {
                type: "ObjectPattern"
                properties: (
                    | Def.NodeRef<"BindingComputedProperty">
                    | Def.NodeRef<"BindingProperty">
                    | Def.NodeRef<"BindingShorthandProperty">
                )[]
            }
            BindingRestElement: {
                type: "RestElement"
                argument: Def.NodeRef<"Identifier">
            }
        }
    }

    export interface Iteration {
        nodes: {
            // Enhancements
            FunctionDeclaration: {
                generator: boolean
            }
            FunctionExpression: {
                generator: boolean
            }

            // New statements
            ForOfStatement: {
                left:
                    | Def.NodeRef<"AssignmentArrayPattern">
                    | Def.NodeRef<"AssignmentObjectPattern">
                    | Def.NodeRef<"BasicMemberExpression">
                    | Def.NodeRef<"ComputedMemberExpression">
                    | Def.NodeRef<"Identifier">
                    | Def.NodeRef<"VariableDeclaration">
                right: Def.NodeRef<"Expression">
                body: Def.NodeRef<"Statement">
            }

            // New expressions
            YieldExpression: {
                delegate: boolean
                argument: Def.NodeRef<"Expression"> | null
            }
        }
        statementType: "ForOfStatement"
        expressionType: "YieldExpression"
    }

    export interface LexicalBinding {
        nodes: {
            // Enhancements
            VariableDeclaration: {
                kind: "var" | "let" | "const"
            }
        }
    }

    export interface Module {
        nodes: {
            // Root
            Program: {
                sourceType: "script"
            }
            ModuleProgram: {
                type: "Program"
                sourceType: "module"
                body: (
                    | Def.NodeRef<"Statement">
                    | Def.NodeRef<"ExportAllDeclaration">
                    | Def.NodeRef<"ExportDefaultDeclaration">
                    | Def.NodeRef<"ExportNamedDeclaration">
                    | Def.NodeRef<"ExportNamedFromDeclaration">
                    | Def.NodeRef<"ImportDeclaration">
                )[]
                comments: Comment[]
                tokens: Token[]
            }

            // Modules
            ExportAllDeclaration: {
                source: Def.NodeRef<"StringLiteral">
            },
            ExportDefaultDeclaration: {
                declaration:
                    | Def.NodeRef<"AnonymousDefaultExportedClassDeclaration">
                    | Def.NodeRef<"AnonymousDefaultExportedFunctionDeclaration">
                    | Def.NodeRef<"ClassDeclaration">
                    | Def.NodeRef<"FunctionDeclaration">
                    | Def.NodeRef<"Expression">
            }
            ExportNamedDeclaration: {
                type: "ExportNamedDeclaration"
                declaration:
                    | Def.NodeRef<"ClassDeclaration">
                    | Def.NodeRef<"FunctionDeclaration">
                    | Def.NodeRef<"VariableDeclaration">
                specifiers: []
                source: null
            }
            ExportNamedFromDeclaration: {
                type: "ExportNamedDeclaration"
                declaration: null
                specifiers: Def.NodeRef<"ExportSpecifier">[]
                source: Def.NodeRef<"StringLiteral">
            }
            ImportDeclaration: {
                specifiers: (
                    | Def.NodeRef<"ImportSpecifier">
                    | Def.NodeRef<"ImportDefaultSpecifier">
                    | Def.NodeRef<"ImportNamespaceSpecifier">
                )[]
                source: Def.NodeRef<"StringLiteral">
            }

            // Others
            AnonymousDefaultExportedClassDeclaration: {
                type: "ClassDeclaration"
                id: null
                superClass: Def.NodeRef<"Expression"> | null
                body: Def.NodeRef<"ClassBody">
            }
            AnonymousDefaultExportedFunctionDeclaration: {
                type: "FunctionDeclaration"
                generator: boolean
                id: null
                params: (
                    | Def.NodeRef<"BindingArrayPattern">
                    | Def.NodeRef<"BindingAssignmentPattern">
                    | Def.NodeRef<"BindingObjectPattern">
                    | Def.NodeRef<"BindingRestElement">
                    | Def.NodeRef<"Identifier">
                )[]
                body: Def.NodeRef<"BlockStatement">
            }
            ExportSpecifier: {
                local: Def.NodeRef<"Identifier">
                exported: Def.NodeRef<"Identifier">
            }
            ImportDefaultSpecifier: {
                local: Def.NodeRef<"Identifier">
            }
            ImportNamespaceSpecifier: {
                local: Def.NodeRef<"Identifier">
            }
            ImportSpecifier: {
                imported: Def.NodeRef<"Identifier">
                local: Def.NodeRef<"Identifier">
            }
        }
    }

    export interface ObjectLiteralEnhancement {
        nodes: {
            // Enhancements
            ObjectExpression: {
                properties: (
                    | Def.NodeRef<"MethodProperty">
                    | Def.NodeRef<"ShorthandProperty">
                    | Def.NodeRef<"ComputedProperty">
                    | Def.NodeRef<"ComputedAccessorProperty">
                    | Def.NodeRef<"ComputedMethodProperty">
                )[]
            }
            BasicProperty: {
                computed: false
                method: false
                shorthand: false
            }
            AccessorProperty: {
                computed: false
                method: false
                shorthand: false
            }

            // New others
            MethodProperty: {
                type: "Property"
                kind: "init"
                computed: false
                method: true
                shorthand: false
                key:
                    | Def.NodeRef<"Identifier">
                    | Def.NodeRef<"NumberLiteral">
                    | Def.NodeRef<"StringLiteral">
                value: Def.NodeRef<"FunctionExpression">
            }
            ShorthandProperty: {
                type: "Property"
                kind: "init"
                computed: false
                method: false
                shorthand: true
                key: Def.NodeRef<"Identifier">
                value: Def.NodeRef<"Identifier">
            }

            ComputedProperty: {
                type: "Property"
                kind: "init"
                computed: true
                method: false
                shorthand: false
                key: Def.NodeRef<"Expression">
                value: Def.NodeRef<"Expression">
            }
            ComputedAccessorProperty: {
                type: "Property"
                kind: "get" | "set"
                computed: true
                method: false
                shorthand: false
                key: Def.NodeRef<"Expression">
                value: Def.NodeRef<"FunctionExpression">
            }
            ComputedMethodProperty: {
                type: "Property"
                kind: "init"
                computed: true
                method: true
                shorthand: false
                key: Def.NodeRef<"Expression">
                value: Def.NodeRef<"FunctionExpression">
            }
        }
    }

    export interface RegExpEnhancement {
        nodes: {
            // Enhancements
            RegExpLiteral: {
                value: null
            }
        }
    }

    export interface Spread {
        nodes: {
            // Enhancements
            ArrayExpression: {
                elements: Def.NodeRef<"SpreadElement">[]
            }
            CallExpression: {
                arguments: Def.NodeRef<"SpreadElement">[]
            }
            NewExpression: {
                arguments: Def.NodeRef<"SpreadElement">[]
            }

            // New others
            SpreadElement: {
                argument: Def.NodeRef<"Expression">
            }
        }
    }
    
    export interface TemplateLiteral {
        nodes: {
            // Expressions
            TaggedTemplateExpression: {
                tag: Def.NodeRef<"Expression">
                quasi: Def.NodeRef<"TemplateLiteral">
            }
            TemplateLiteral: {
                quasis: Def.NodeRef<"TemplateElement">[]
                expressions: Def.NodeRef<"Expression">[]
            }

            // Others
            TemplateElement: {
                tail: boolean
                value: { cooked: string; raw: string }
            }
        }
        expressionType: "TaggedTemplateExpression" | "TemplateLiteral"
    }
}

export interface ASTDefinition extends Def.Extends<es5.ASTDefinition, [
    ASTEnhancements.ArrowFunction,
    ASTEnhancements.Class,
    ASTEnhancements.DestructuringAssignment,
    ASTEnhancements.DestructuringBinding,
    ASTEnhancements.Iteration,
    ASTEnhancements.LexicalBinding,
    ASTEnhancements.Module,
    ASTEnhancements.ObjectLiteralEnhancement,
    ASTEnhancements.RegExpEnhancement,
    ASTEnhancements.Spread,
    ASTEnhancements.TemplateLiteral,
]> {}

//------------------------------------------------------------------------------
// Unions
//------------------------------------------------------------------------------

export type Node<T extends string = "Node"> = Def.ExtractNode<T, ASTDefinition>

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
export interface ClassDeclaration extends Def.Node<"ClassDeclaration", ASTDefinition> {}
export interface ContinueStatement extends Def.Node<"ContinueStatement", ASTDefinition> {}
export interface DebuggerStatement extends Def.Node<"DebuggerStatement", ASTDefinition> {}
export interface DoWhileStatement extends Def.Node<"DoWhileStatement", ASTDefinition> {}
export interface EmptyStatement extends Def.Node<"EmptyStatement", ASTDefinition> {}
export interface ExpressionStatement extends Def.Node<"ExpressionStatement", ASTDefinition> {}
export interface ForInStatement extends Def.Node<"ForInStatement", ASTDefinition> {}
export interface ForOfStatement extends Def.Node<"ForOfStatement", ASTDefinition> {}
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
export interface ArrowFunctionExpression extends Def.Node<"ArrowFunctionExpression", ASTDefinition> {}
export interface AssignmentExpression extends Def.Node<"AssignmentExpression", ASTDefinition> {}
export interface BasicMemberExpression extends Def.Node<"BasicMemberExpression", ASTDefinition> {}
export interface BinaryExpression extends Def.Node<"BinaryExpression", ASTDefinition> {}
export interface BooleanLiteral extends Def.Node<"BooleanLiteral", ASTDefinition> {}
export interface CallExpression extends Def.Node<"CallExpression", ASTDefinition> {}
export interface ClassExpression extends Def.Node<"ClassExpression", ASTDefinition> {}
export interface ComputedMemberExpression extends Def.Node<"ComputedMemberExpression", ASTDefinition> {}
export interface ConditionalExpression extends Def.Node<"ConditionalExpression", ASTDefinition> {}
export interface FunctionExpression extends Def.Node<"FunctionExpression", ASTDefinition> {}
export interface Identifier extends Def.Node<"Identifier", ASTDefinition> {}
export interface LogicalExpression extends Def.Node<"LogicalExpression", ASTDefinition> {}
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
export interface BasicProperty extends Def.Node<"BasicProperty", ASTDefinition> {}
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
export interface MethodDefinition extends Def.Node<"MethodDefinition", ASTDefinition> {}
export interface MethodProperty extends Def.Node<"MethodProperty", ASTDefinition> {}
export interface ShorthandProperty extends Def.Node<"ShorthandProperty", ASTDefinition> {}
export interface SpreadElement extends Def.Node<"SpreadElement", ASTDefinition> {}
export interface Super extends Def.Node<"Super", ASTDefinition> {}
export interface SwitchCase extends Def.Node<"SwitchCase", ASTDefinition> {}
export interface TemplateElement extends Def.Node<"TemplateElement", ASTDefinition> {}
export interface VariableDeclarator extends Def.Node<"VariableDeclarator", ASTDefinition> {}
