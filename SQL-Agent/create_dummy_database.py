import sqlite3

# Connect or create database
conn = sqlite3.connect("movies_data.db")
cursor = conn.cursor()

# Drop old tables if they exist (safe re-run)
cursor.executescript("""
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS movie_cast;
DROP TABLE IF EXISTS actors;
DROP TABLE IF EXISTS movies;
""")

# -----------------------
# Create Tables
# -----------------------

# Movies table
cursor.execute("""
CREATE TABLE movies (
    movie_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    genre TEXT,
    release_year INTEGER,
    avg_rating REAL,
    duration_minutes INTEGER,
    director TEXT
);
""")

# Actors table
cursor.execute("""
CREATE TABLE actors (
    actor_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    birth_year INTEGER,
    nationality TEXT
);
""")

# Movie Cast (many-to-many)
cursor.execute("""
CREATE TABLE movie_cast (
    movie_id INTEGER,
    actor_id INTEGER,
    role TEXT,
    FOREIGN KEY(movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY(actor_id) REFERENCES actors(actor_id)
);
""")

# Reviews table (for rating system)
cursor.execute("""
CREATE TABLE reviews (
    review_id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie_id INTEGER,
    user_name TEXT,
    rating REAL CHECK(rating >= 0 AND rating <= 10),
    comment TEXT,
    FOREIGN KEY(movie_id) REFERENCES movies(movie_id)
);
""")

# -----------------------
# Insert Dummy Data
# -----------------------

# Movies
movies_data = [
    ("Inception", "Sci-Fi", 2010, 8.8, 148, "Christopher Nolan"),
    ("The Godfather", "Crime", 1972, 9.2, 175, "Francis Ford Coppola"),
    ("Titanic", "Romance", 1997, 7.8, 195, "James Cameron"),
    ("The Dark Knight", "Action", 2008, 9.0, 152, "Christopher Nolan"),
    ("Avatar", "Adventure", 2009, 7.9, 162, "James Cameron"),
]
cursor.executemany("""
INSERT INTO movies (title, genre, release_year, avg_rating, duration_minutes, director)
VALUES (?, ?, ?, ?, ?, ?);
""", movies_data)

# Actors
actors_data = [
    ("Leonardo DiCaprio", 1974, "American"),
    ("Al Pacino", 1940, "American"),
    ("Christian Bale", 1974, "British"),
    ("Morgan Freeman", 1937, "American"),
    ("Kate Winslet", 1975, "British"),
]
cursor.executemany("""
INSERT INTO actors (name, birth_year, nationality)
VALUES (?, ?, ?);
""", actors_data)

# Cast
movie_cast_data = [
    (1, 1, "Dom Cobb"),            # Inception - Leonardo DiCaprio
    (2, 2, "Michael Corleone"),    # The Godfather - Al Pacino
    (3, 1, "Jack Dawson"),         # Titanic - Leonardo DiCaprio
    (3, 5, "Rose DeWitt Bukater"), # Titanic - Kate Winslet
    (4, 3, "Bruce Wayne"),         # The Dark Knight - Christian Bale
    (4, 4, "Lucius Fox"),          # The Dark Knight - Morgan Freeman
    (5, 1, "Jake Sully"),          # Avatar - Leonardo DiCaprio (fictional)
]
cursor.executemany("""
INSERT INTO movie_cast (movie_id, actor_id, role)
VALUES (?, ?, ?);
""", movie_cast_data)

# Reviews (multiple users)
reviews_data = [
    (1, "Alice", 9.0, "Mind-bending and brilliant."),
    (1, "Bob", 8.5, "Amazing visuals, a bit confusing at times."),
    (2, "Chris", 9.5, "Classic masterpiece."),
    (3, "Diana", 8.0, "Beautiful love story."),
    (3, "Ethan", 7.5, "Too long but emotional."),
    (4, "Farah", 9.3, "Best superhero movie ever."),
    (4, "George", 8.8, "Dark and deep story."),
    (5, "Hina", 8.0, "Visually stunning."),
    (5, "Irfan", 7.8, "Good but too long."),
]
cursor.executemany("""
INSERT INTO reviews (movie_id, user_name, rating, comment)
VALUES (?, ?, ?, ?);
""", reviews_data)

conn.commit()

# -----------------------
# Compute Average Ratings Dynamically
# -----------------------
cursor.execute("""
UPDATE movies
SET avg_rating = (
    SELECT ROUND(AVG(rating), 1)
    FROM reviews
    WHERE reviews.movie_id = movies.movie_id
);
""")

conn.commit()
conn.close()

print("movies_data.db created successfully with ratings, cast, and reviews!")
