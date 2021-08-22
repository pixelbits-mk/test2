import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Book } from "../models/book";

@Injectable({ providedIn: 'root'})
export class BookService {
    get books$() {
        return this.firestore.collection<Book>('books').valueChanges()
    }
    constructor(private firestore: AngularFirestore) {

    }
    addBook(book: Book) {
        return this.firestore.collection('books').add(book)
    }
    
}