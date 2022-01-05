import { useModalContext } from "@Contexts/ModalContextProvider";
import { Comment, Favorite } from "@mui/icons-material";
import Share from "@mui/icons-material/Share";
import MuiCard from "@mui/material/Card";
import React, { useRef } from "react";
import useImgLazyLoad from "../../../utils/hooks/useImgLazyLoad";
import useModal from "../../../utils/hooks/useModal";
import * as S from "./Style";

interface IProps {
  worldCup: WorldCup;
}

const isLoading = false;

function Card({ worldCup }: IProps) {
  const { id, desc, title, targets, commentCounts, likeCounts } = worldCup;
  const { openModal } = useModalContext();

  const {
    image: { lowQuality, originalQuality },
  } = targets[0];

  const imageRef = useRef<HTMLImageElement>(null);

  const { imgSrc } = useImgLazyLoad(imageRef, originalQuality, lowQuality);

  const actions = [
    { Icon: Favorite, label: likeCounts },
    { Icon: Comment, label: commentCounts },
    { Icon: Share },
  ];

  return (
    <MuiCard onClick={() => openModal(id)}>
      <S.CardHeader isLoading={isLoading} src={imgSrc} title={title} subTitle='By Rolo' />
      <S.CardMedia isLoading={isLoading} ref={imageRef} src={imgSrc} />
      <S.CardContent isLoading={isLoading} desc={desc} />
      <S.CardActions isLoading={isLoading} actions={actions} />
    </MuiCard>
  );
}

export default Card;

// CardHeader
//   <MuiCardHeader
//     avatar={
//       isLoading ? (
//         <Skeleton variant='circular' sx={{ width: "3rem", height: "3rem" }} />
//       ) : (
//         <Avatar sx={{ width: "3rem", height: "3rem" }} src={imgSrc} alt='user-avatar' />
//       )
//     }
//     title={isLoading ? <Skeleton height={20} /> : title}
//     subheader={isLoading ? <Skeleton height={15} width={50} /> : "By rolo"}
//     sx={{ height: "5rem" }}
//   />
//   {/* CardMedia */}
//   {isLoading ? (
//     <Skeleton variant='rectangular' height={200} />
//   ) : (
//     <MuiCardMedia component='img' src={imgSrc} height={200} alt='title' />
//   )}
//   {/* CardContent */}
//   <MuiCardContent>
//     <Typography variant='body2'>
//       {isLoading ? (
//         <>
//           <Skeleton height={15} variant='text' />
//           <Skeleton height={15} variant='text' />
//           <Skeleton height={15} variant='text' />
//         </>
//       ) : (
//         desc
//       )}
//     </Typography>
//   </MuiCardContent>
//   <MuiCardActions disableSpacing>
//     <Box sx={{ display: "flex", alignItems: "center" }}>
//       {isLoading ? (
//         <>
//           <Skeleton variant='circular' sx={{ width: "1.5rem", height: "1.5rem", mr: 1 }} />
//           <Skeleton variant='text' width={23} height={15} sx={{ mr: 1 }} />
//         </>
//       ) : (
//         <>
//           <IconButton size='small'>
//             <Favorite />
//           </IconButton>
//           <Typography variant='overline'>{likeCounts}</Typography>
//         </>
//       )}
//     </Box>
//     <Box sx={{ display: "flex", alignItems: "center" }}>
//       {isLoading ? (
//         <>
//           <Skeleton variant='circular' sx={{ width: "1.5rem", height: "1.5rem", mr: 1 }} />
//           <Skeleton variant='text' width={23} height={15} sx={{ mr: 1 }} />
//         </>
//       ) : (
//         <>
//           <IconButton size='small'>
//             <Comment />
//           </IconButton>
//           <Typography variant='overline'>{commentCounts}</Typography>
//         </>
//       )}
//     </Box>
//     <Box sx={{ display: "flex", alignItems: "center" }}>
//       {isLoading ? (
//         <Skeleton variant='circular' sx={{ width: "1.5rem", height: "1.5rem", mr: 1 }} />
//       ) : (
//         <IconButton size='small'>
//           <Share />
//         </IconButton>
//       )}
//     </Box>
//   </MuiCardActions>
