import * as fs from "fs";
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
export default class List {
    constructor() {
        //tail--->node--->head
        this.head = null;
        this.tail = null;
    }
    isEmpty() {
        return this.head == null;
    }
    append(data) {
        const newNode = new Node(data);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = newNode; // Устанавливаем ссылку на самого себя для создания кольцевой структуры
        } else {
            newNode.next = this.head;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        return this;
    }
    print() {
        if (this.isEmpty())
            console.log("Список пуст.", "\n");
        else {
            let current = this.head;
            console.log("\nСписок:");
            do {
                console.log(JSON.stringify(current.data));
                current = current.next;
            } while (current !== this.head);
        }
    }
    isTrue(cur, key, op, value) {
        switch (op) {
            case "==":
                return key in cur.data && cur.data[key] == value;
            case "!=":
                return key in cur.data && cur.data[key] != value;
            case ">":
                return key in cur.data && cur.data[key] > value;
            case ">=":
                return key in cur.data && cur.data[key] >= value;
            case "<":
                return key in cur.data && cur.data[key] < value;
            case "<=":
                return key in cur.data && cur.data[key] >= value;
            case "all":
                return true;
            default:
                return false;
        }
    }
    deleteHead() {
        if (this.isEmpty())
            return;
        if (this.head.next == this.head) {
            this.head = this.tail = null;
            return;
        }
        this.head = this.head.next;
        this.tail.next = this.head;
    }
    deleteTail() {
        if (this.isEmpty())
            return;
        if (this.head == this.tail) {
            this.deleteHead();
            return;
        }
        let p = this.head;
        while (p.next !== this.tail) {
            p = p.next;
        }
        this.tail = p;
        this.tail.next = this.head;
    }
    deleteNode(serNode) {
        if (this.isEmpty() || serNode == null)
            return;
        if (this.head == serNode) {
            this.deleteHead();
            return;
        } else if (this.tail == serNode) {
            this.deleteTail();
            return;
        }
        let prev = this.head;
        let cur = this.head.next;
        while (cur && cur !== serNode) {
            cur = cur.next;
            prev = prev.next;
        }
        if (!cur)
            return;
        prev.next = cur.next;
    }
    freeList() {
        if (this.isEmpty())
            return;
        while (!this.isEmpty()) {
            this.deleteHead();
        }
    }
    delete(...args) {
        const [key, op, value] = args;
        let remNode = this.head;
        let buff = remNode;
        let flag = false;
        while (true) {
            if (this.isTrue(remNode, key, op, value)) {
                if (remNode == this.head) {
                    this.deleteNode(remNode);
                    remNode = this.head;
                } else if (remNode == this.tail) {
                    this.deleteNode(remNode);
                    remNode = this.tail;
                } else {
                    buff = remNode;
                    buff = buff.next;
                    this.deleteNode(remNode);
                    remNode = buff;
                }
            } else
                remNode = remNode.next;
            if (!remNode || flag)
                return;
            if (remNode == this.tail)
                flag = true;
        }
    }
}