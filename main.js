document.getElementById("btn").addEventListener("click", fizzbuzz);


function fizzbuzz() {
    let num = document.getElementById('input').value
    let bish = document.getElementById('input2').value;
    let bosh = document.getElementById('input3').value;
    //console.log(bosh)
    for (let i = 1; i <= num; i++) {

        if (i % bish === 0 && i % bosh === 0) {
            document.getElementById('output').innerHTML += "BishBosh<br>";
        } else if (i % bish === 0) {
            document.getElementById('output').innerHTML += "Bish<br>";
        } else if (i % bosh === 0) {
            document.getElementById('output').innerHTML += "Bosh<br>";
        } else {
            document.getElementById('output').innerHTML += i + "<br>";
        }
    }
}
