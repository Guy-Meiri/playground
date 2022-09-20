function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return adjDescriptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById("project-input") as HTMLTemplateElement;
    this.hostElement = document.getElementById("app") as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";
    this.attach();

    this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionElement = this.element.querySelector("#description") as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

    this.configure();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
    }

    this.clearInputs();
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionElement.value = "";
    this.peopleInputElement.value = "";
  }

  private getUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value;
    const description = this.descriptionElement.value;
    const people = this.peopleInputElement.value;

    if (title.trim().length === 0 || description.trim().length === 0 || people.trim().length === 0) {
      alert("invalid input");
      return;
    }

    return [title, description, +people];
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}

const prjInput = new ProjectInput();
