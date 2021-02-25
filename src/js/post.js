const myFunc = () => {
    return 2 + 4;
}

class Post {
    constructor(title, img) {
        this.title = title;
        this.date = new Date();
        this.img = img;
    }

    toString() {
        JSON.stringify({
            title: this.title,
            date: this.date,
            img: this.img
        })
    }

    get uppercaseTitle() {
        return this.title.toUpperCase();
    }
}

export { Post, myFunc };