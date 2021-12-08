import { rest } from "msw";
import mockedCategories from "../assets/temp/categories.json";
import mockedWorldCups from "../assets/temp/worldCups.json";
import mockedGames from "../assets/temp/gameExample.json";

const getWorldCupById = rest.get(
  `${process.env.REACT_APP_SERVER_URL}/worldcups/1`,
  (req, res, ctx) => {
    let level: any = req.url.searchParams.get("level");
    if (level) level = parseInt(level, 10);
    if (level === 8) return res(ctx.status(200), ctx.json(mockedGames.data as WorldCup));
    if (level === 4)
      return res(
        ctx.status(200),
        ctx.json({ ...mockedGames.data, targets: mockedGames.data.targets.slice(0, 4) }),
      );
    return res(ctx.status(400), ctx.json({ message: "타겟이 8개까지 있습니다." }));
  },
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
    const { file } = req.body as {
      file: { name: string; contentType: string; dataUri: string };
    };
    return res(
      ctx.status(200),
      ctx.json({
        message: "success",
        result: {
          url: "photo-1534148206-f085ba17015a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
          ContentType: "img/jpg",
          bucketUrl: "https://images.unsplash.com",
          locations: {
            big: "photo-1534148206-f085ba17015a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
            low: "photo-1534148206-f085ba17015a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
            original:
              "photo-1534148206-f085ba17015a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
            small:
              "photo-1534148206-f085ba17015a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
          },
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
