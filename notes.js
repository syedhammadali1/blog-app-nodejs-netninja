// first i will run command 

npm init -y //npm int to create package.json file and  -y to ignore questions

install project and dev dependencies  

nodemon  //restart the start automatic and this a dev dependency



















// create class instanse without using new keyword
class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  
    sayHello() {
      console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
  }
  
  // Factory function to create a Person instance
  function createPerson(name, age) {
    return new Person(name, age);
  }
  
  // Usage:
  const person1 = createPerson('John', 30);
  person1.sayHello(); // Output: "Hello, my name is John and I am 30 years old."
