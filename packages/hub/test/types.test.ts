import * as ts from 'typescript';

describe('dom types', () => {
  const fileNames: string[] = [];
  // Note: no "dom" lib
  const options: ts.CompilerOptions = { lib: ['ES5', 'ScriptHost'] };

  // Build a program using the set of root file names in fileNames
  const program = ts.createProgram(fileNames, options);

  // Get the checker, which we can use to examine symbols
  const checker = program.getTypeChecker();

  const visit = (node: ts.Node): void => {
    // we only care about nodes denoting types
    if (!ts.isTypeReferenceNode(node)) {
      return;
    }

    const x: SomeType = 3;
  };

  it("shouldn't contain unvendored dom types", () => {
    // Visit every sourceFile in the program
    for (const sourceFile of program.getSourceFiles()) {
      if (!sourceFile.isDeclarationFile) {
        // Walk the tree to search for classes
        ts.forEachChild(sourceFile, visit);
      }
    }
  });
});
