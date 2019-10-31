var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;
var context = canvas.getContext("2d");

var atoms = [];

for (let i = 0; i < 6; i++) {
    atoms.push(createRandomAtom());
}

linkAllAtoms = (atom1) => {
    atoms.forEach(atom2 => {
        if (atom1 != atom2) {
            context.beginPath();
            context.moveTo(atom1.pos.x, atom1.pos.y);
            var middistX = Math.abs(atom1.pos.x - atom2.pos.x) / 2;
            var middistY = Math.abs(atom1.pos.y - atom2.pos.y) / 2;
            context.strokeStyle = atom1.color;
            if (atom1.pos.x < atom2.pos.x) {
                if (atom1.pos.y < atom2.pos.y)
                    context.lineTo(atom1.pos.x + middistX, atom1.pos.y + middistY);
                else
                    context.lineTo(atom1.pos.x + middistX, atom1.pos.y - middistY);
            } else {
                if (atom1.pos.y < atom2.pos.y)
                    context.lineTo(atom1.pos.x - middistX, atom1.pos.y + middistY);
                else
                    context.lineTo(atom1.pos.x - middistX, atom1.pos.y - middistY);
            }
            context.closePath();
            context.stroke();
        }
    });
}

update = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    atoms.forEach(atom1 => {
        linkAllAtoms(atom1);
        atom1.draw();
        atom1.update();
    });
}

setInterval(update, 10);