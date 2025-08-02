const requireField = fieldName => {
  return value => {
    if (String(value).length === 0) {
      return fieldName + ' is required';
    }
    return true;
  };
};

module.exports = plop => {
  plop.setHelper('and', function (a, b) {
    return a && b;
  });
  plop.setGenerator('component', {
    description: 'Create a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
        transformer: name => `${name}`,
        validate: requireField('name'),
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/style.ts',
        templateFile: 'plop-templates/Component/style.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/Component/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}Types.ts',
        templateFile: 'plop-templates/Component/types.ts.hbs',
      },
    ],
  });
  plop.setGenerator('screen', {
    description: 'Create a screen',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your screen name?',
        transformer: name => `${name}`,
        validate: requireField('name'),
      },
      {
        type: 'confirm',
        name: 'scrollEnable',
        message: 'Do you want to enable scrolling for this screen?(N)',
        default: false, // defaults to false if the user does not want scrolling
      },
      {
        type: 'confirm',
        name: 'hideStatusbar',
        message: 'Do you want to hide status bar for this screen?(N)',
        default: false,
      },
      {
        type: 'confirm',
        name: 'useRedux',
        message: 'Do you want to use redux on this screen?(N)',
        default: false,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/screens/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Screen/Screen.tsx.hbs',
      },
    ],
  });
  plop.setGenerator('svg', {
    description: 'Create a reusable SVG Icon',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your SVG Icon name?',
        transformer: name => `${name}Svg`,
        validate: requireField('name'),
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/assets/svgs/{{pascalCase name}}Svg.tsx',
        templateFile: 'plop-templates/Svgs/Svgs.tsx.hbs',
      },
    ],
  });
};
