const sqlite3 = require('sqlite3')

sqlite3.verbose()

const db = new sqlite3.Database('./database/database.db')

db.serialize(() => {
    
    db.run(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        login TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        birthday TEXT NOT NULL,
        classroom_id INTEGER NOT NULL,
        ra INTEGER NOT NULL,
        image TEXT,
        FOREIGN KEY (classroom_id) REFERENCES classrooms (classroom_id)
            ON DELETE CASCADE ON UPDATE NO ACTION
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS classrooms (
        classroom_id INTEGER PRIMARY KEY AUTOINCREMENT,
        classroom_name TEXT NOT NULL
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS subjects (
        subject_id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject_name TEXT NOT NULL,
        classroom_id INTEGER,
        FOREIGN KEY (classroom_id) REFERENCES classrooms (classroom_id)
            ON DELETE CASCADE ON UPDATE NO ACTION
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS homeworks (
        homework_id INTEGER PRIMARY KEY AUTOINCREMENT,
        classroom_id INTEGER,
        subject_id INTEGER,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        archives TEXT,
        teacher_id INTEGER,
        created_at TEXT,
        delivery_data TEXT,
        FOREIGN KEY (classroom_id) REFERENCES classrooms (classroom_id)
            ON DELETE CASCADE ON UPDATE NO ACTION
        FOREIGN KEY (subject_id) REFERENCES subjects (subject_id)
            ON DELETE CASCADE ON UPDATE NO ACTION
        FOREIGN KEY (teacher_id) REFERENCES users (id)
            ON DELETE CASCADE ON UPDATE NO ACTION
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS done_homeworks (
        done_homework_id INTEGER PRIMARY KEY AUTOINCREMENT,
        homework_id INTEGER,
        student_id INTEGER,
        archives TEXT,
        FOREIGN KEY (homework_id) REFERENCES homeworks (homework_id)
            ON DELETE CASCADE ON UPDATE NO ACTION
        FOREIGN KEY (student_id) REFERENCES users (id)
            ON DELETE CASCADE ON UPDATE NO ACTION
    )`)

})


module.exports = db