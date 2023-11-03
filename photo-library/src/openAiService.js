const OpenAI = require("openai");
const openai = new OpenAI();
const { getPhoto } = require("../src/photoService");

const getPitch = async (photoId) => {
  const photo = await getPhoto(photoId);

  const prompt = `Translate "${photo.title}" from Latin to English and use as artwork name. Translate "${photo.album.title}" from Latin to English and use as album name. Generate a short selling pitch for the artwork, using its translated name and translated album name, mention the author - ${photo.album.user.name}, from ${photo.album.user.address.city}, and selling company ${photo.album.user.company.name}. Creatively use words from "${photo.album.user.company.catchPhrase}" and "${photo.album.user.company.ps}". Return the pitch phrase only.`;
  console.debug(prompt);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a top performing seller at a company named ${photo.album.user.company.name}`,
      },
      { role: "user", content: prompt },
    ],
    model: "gpt-4",
  });
  return completion.choices[0].message.content;
};

module.exports = { getPitch };
