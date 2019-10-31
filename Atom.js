class Atom {

    constructor(pos, radius, color) {
        this.pos = pos;
        this.radius = radius;
        this.color = color;
        this.dir = {x: Math.floor(Math.random() * 2) == 1 ? 1 : -1, y: Math.floor(Math.random() * 2) == 1 ? 1 : -1};
        this.speed = {max: Math.random() * 3 + 1, x: 0, y: 0};
    }

    update = () => {
        if (this.pos.x + this.radius >= canvas.width || this.pos.x - this.radius <= 0 || this.pos.y + this.radius >= canvas.height || this.pos.y - this.radius <= 0 || this.speed.x == 0 && this.speed.y == 0) {
            if (this.pos.x + this.radius >= canvas.width || this.pos.x - this.radius <= 0)
                this.speed.x *= -1;
            if (this.pos.y + this.radius >= canvas.height || this.pos.y - this.radius <= 0)
                this.speed.y *= -1;
            if (this.speed.x == 0 && this.speed.y == 0)
                this.speed.x = (Math.floor(Math.random() * 2) == 1 ? 1 : -1) * Math.random() * this.speed.max;
        } else {
            this.speed.x += (Math.floor(Math.random() * 2) == 1 ? 1 : -1) * Math.random() * this.speed.max / 10;
            if (this.speed.x < -this.speed.max)
                this.speed.x = -this.speed.max;
            else if (this.speed.x > this.speed.max)
                this.speed.x = this.speed.max;
        }
        this.pos.x += this.speed.x;
        this.speed.y = Math.sqrt(this.speed.max * this.speed.max - this.speed.x * this.speed.x) * (this.speed.y > 0 ? 1 : -1);
        this.pos.y += this.speed.y;
    }

    draw = () => {
        this.drawMidLineTo(this.findNearestAtom())
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.radius * 2, 0, Math.PI * 2);
        context.closePath();
        context.fillStyle = this.color;
        context.fill();
    }

    findNearestAtom = () => {
        var nearest = {atom: null, dist: null};
        atoms.forEach(atom => {
            if (atom != this) {
                if (nearest.atom == null) {
                    nearest.atom = atom;
                    nearest.dist = Math.sqrt(Math.pow(Math.abs(this.pos.x - atom.pos.x), 2) + Math.pow(Math.abs(this.pos.y - atom.pos.y), 2));
                } else {
                    var dist = Math.sqrt(Math.pow(Math.abs(this.pos.x - atom.pos.x), 2) + Math.pow(Math.abs(this.pos.y - atom.pos.y), 2));
                    if (nearest.dist > dist) {
                        nearest.atom = atom;
                        nearest.dist = dist;
                    }
                }
            }
        });
        return nearest.atom;
    }

    drawMidLineTo = (atom) => {
        if (atom != null) {
            context.beginPath();
            context.moveTo(this.pos.x, this.pos.y);
            var middistX = Math.abs(this.pos.x - atom.pos.x) / 2;
            var middistY = Math.abs(this.pos.y - atom.pos.y) / 2;
            context.strokeStyle = this.color;
            if (this.pos.x < atom.pos.x) {
                if (this.pos.y < atom.pos.y)
                    context.lineTo(this.pos.x + middistX, this.pos.y + middistY);
                else
                    context.lineTo(this.pos.x + middistX, this.pos.y - middistY);
            } else {
                if (this.pos.y < atom.pos.y)
                    context.lineTo(this.pos.x - middistX, this.pos.y + middistY);
                else
                    context.lineTo(this.pos.x - middistX, this.pos.y - middistY);
            }
            context.closePath();
            context.stroke();
        }
    }
}

getRandomColor = () => {
    var hexLetters = "0123456789ABCDEF";
    var color = "#";
    for (let i = 0; i < 6; i++) {
        color += hexLetters[Math.floor(Math.random() * hexLetters.length)];
    }
    return color;
}

createRandomAtom = () => {
    var radius = Math.floor(Math.random() * 11) + 5;
    var x = Math.floor(Math.random() * (canvas.width + 1 - radius * 2)) + radius;
    var y = Math.floor(Math.random() * (canvas.height + 1 - radius * 2)) + radius;
    return new Atom({x: x, y: y}, radius, getRandomColor());
}