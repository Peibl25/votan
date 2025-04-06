
const fs = require("fs");
const path = require("path");

const votosPath = path.resolve(__dirname, "../../data/votos.json");

exports.handler = async function(event, context) {
  if (event.httpMethod === "POST") {
    const nuevosVotos = JSON.parse(event.body || "[]");
    let actuales = [];

    if (fs.existsSync(votosPath)) {
      const raw = fs.readFileSync(votosPath);
      actuales = JSON.parse(raw);
    }

    actuales.push(...nuevosVotos);
    fs.writeFileSync(votosPath, JSON.stringify(actuales, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "ok", cantidad: actuales.length })
    };
  }

  if (event.httpMethod === "GET") {
    if (fs.existsSync(votosPath)) {
      const raw = fs.readFileSync(votosPath);
      return {
        statusCode: 200,
        body: raw
      };
    } else {
      return {
        statusCode: 200,
        body: "[]"
      };
    }
  }

  return {
    statusCode: 405,
    body: "Método no permitido"
  };
};
