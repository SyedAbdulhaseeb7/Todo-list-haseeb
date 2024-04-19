#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
let todolist = [];
let condition = true;
async function main() {
    while (condition) {
        let todouser = await inquirer.prompt([
            {
                name: "listodo",
                type: "list",
                message: "Select Option",
                choices: ["Add Task", "Update", "View Task", "remove task", "Exit"]
            }
        ]);
        if (todouser.listodo === "Add Task") {
            await addtask();
        }
        else if (todouser.listodo === "View Task") {
            await viewtask();
        }
        else if (todouser.listodo === "Update") {
            await update();
        }
        else if (todouser.listodo === "remove task") {
            await removetask();
        }
        else if (todouser.listodo === "Exit") {
            condition = false;
        }
    }
}
let addtask = async () => {
    let add_task = await inquirer.prompt([
        {
            name: "add",
            type: "any",
            message: "ADD ANYTHING",
        }
    ]);
    const task = add_task.add.trim();
    todolist.push(task);
    console.log(`${chalk.yellow(todolist)}`);
};
main();
let update = async () => {
    let updateTodo = await inquirer.prompt({
        type: "list",
        message: "Update your list todo",
        name: "todo",
        choices: todolist.map(item => item)
    });
    let addTodo = await inquirer.prompt({
        type: "input",
        message: "Add now",
        name: "todo",
    });
    let newTodo = todolist.filter(val => val !== updateTodo.todo);
    todolist = [...newTodo, addTodo.todo];
    console.log(todolist);
};
let removetask = async () => {
    let removetask = await inquirer.prompt({
        type: "list",
        message: "Update your list todo",
        name: "remove",
        choices: todolist.map(item => item)
    });
    let newTodo = todolist.filter(val => val !== removetask.remove);
    let delet = todolist.splice(newTodo, 1);
    console.log(`Your deleted task ${chalk.redBright(delet)}`);
};
let viewtask = async () => {
    todolist.forEach((index) => {
        console.log(`${chalk.yellow(index)}`);
    });
    if (todolist < [1]) {
        console.log(chalk.bgGreenBright(`you todo list is empty`));
    }
};
