function describePerson(person: {name: string, age: number, height: number}) {
    return `${person.name} ${person.age} ${person.height}`;
}

function call<ArgumentType extends any[], ReturnType>(
    functionCall: (...args: ArgumentType) => ReturnType,
    ...args: ArgumentType
): ReturnType {
    return functionCall(...args);
}

const personalInfo = call(describePerson, '123321213123'); // Передали некорректные параметры

// Тип куда мы передаем тип функции и определить какой у нее возвращаемый тип
type FunctionReturnType<FunctionType extends (args: any) => any>
    = FunctionType extends (...args: any) => infer ReturnType ? ReturnType : any;


type FunctionArgType<FunctionType>
    = FunctionType extends (...args: infer ArgType) => any ? ArgType : any;

type CustomFunctionType = (text: string) => string;
type CustomFunctionArgType = FunctionArgType<CustomFunctionType>;
