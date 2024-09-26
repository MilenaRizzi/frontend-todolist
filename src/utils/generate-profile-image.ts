function generateProfileImage(name: string, size = 150) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Escolher uma cor de fundo baseada no nome
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33A1"];
    const backgroundColor = colors[name.charCodeAt(0) % colors.length];

    // Desenhar o fundo
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, size, size);

    // Desenhar a inicial do nome
    ctx.font = `${size / 2}px Arial`;
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name.charAt(0).toUpperCase(), size / 2, size / 2);
  }

  // Retornar a imagem como uma URL de base64
  return canvas.toDataURL("image/png");
}
