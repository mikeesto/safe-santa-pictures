const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const input = document.getElementById('file-input');
const selectBtn = document.getElementById('select-button');
const downloadBtn = document.getElementById('download-button');

selectBtn.addEventListener('click', () => {
  input.click();
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'santa.png';
  link.href = canvas.toDataURL();
  link.click();
});

input.addEventListener('change', handleFile);

function drawSanta() {
  const santa = new Image();
  santa.onload = () => {
    context.drawImage(santa, 0, 0);
  };

  santa.src = './santa.png';
}

function handleFile(e) {
  const image = new Image();

  image.onload = () => {
    URL.revokeObjectURL(image.src);
    const ratio = Math.min(280 / image.width, 190 / image.height);

    context.drawImage(
      image,
      270,
      90,
      image.width * ratio,
      image.height * ratio,
    );

    selectBtn.style.display = 'none';
    downloadBtn.style.display = 'block';
  };

  image.src = URL.createObjectURL(e.target.files[0]);
}

drawSanta();
