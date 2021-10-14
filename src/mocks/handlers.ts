import { rest } from "msw";
import mockedCategories from "../assets/temp/categories.json";
import mockedWorldCups from "../assets/temp/worldCups.json";
import mockedGames from "../assets/temp/gameExample.json";

const getWorldCupById = rest.get(
  `${process.env.REACT_APP_SERVER_URL}/worldcups/1`,
  // ?level=4
  (req, res, ctx) => res(ctx.status(200), ctx.json(mockedGames.data as WorldCup)),
);

const getWorldCups = rest.get(`${process.env.REACT_APP_SERVER_URL}/worldcups`, (req, res, ctx) =>
  res(ctx.status(200), ctx.json(mockedWorldCups.data as WorldCup[])),
);

const getCategories = rest.get(`${process.env.REACT_APP_SERVER_URL}/categories`, (req, res, ctx) =>
  res(ctx.status(200), ctx.json(mockedCategories.data as Category[])),
);

const postWorldCup = rest.post(`${process.env.REACT_APP_SERVER_URL}/worldcups`, (req, res, ctx) =>
  res(ctx.status(200), ctx.json({ message: "메세지 뭐로오는지 모름" })),
);

const postImgToResizingServer = rest.post(
  `${process.env.REACT_APP_AWS_GATEWAY_URL}/`,
  (req, res, ctx) => {
    const { param, setProgress } = req.body as {
      param: { file: { name: string; contentType: string; dataUri: string } };
      setProgress: React.Dispatch<React.SetStateAction<number>>;
    };

    setProgress(100);
    return res(
      ctx.status(200),
      ctx.json({
        message: "success",
        result: {
          ContentType: "img/jpg",
          bucketUrl: "모름",
          locations: { big: "", low: "", original: "", small: "" },
        },
      } as ImgResizingResponse),
    );
  },
);

const handlers = [
  getWorldCupById,
  getWorldCups,
  getCategories,
  postWorldCup,
  postImgToResizingServer,
];

export default handlers;
