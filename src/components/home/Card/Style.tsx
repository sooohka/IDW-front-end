import { Avatar, IconButton, SvgIconTypeMap } from "@mui/material";
import Box from "@mui/material/Box";
import MuiCardActions from "@mui/material/CardActions";
import MuiCardContent from "@mui/material/CardContent";
import MuiCardHeader from "@mui/material/CardHeader";
import MuiCardMedia from "@mui/material/CardMedia";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import React, { forwardRef } from "react";

interface CardActionsProps {
  isLoading: boolean;
  actions: {
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    };
    label?: string | number;
  }[];
}

function CardActions({ isLoading, actions }: CardActionsProps) {
  return (
    <MuiCardActions disableSpacing>
      {actions.map(({ Icon, label }) => (
        <Box key={`${label}`} sx={{ display: "flex", alignItems: "center" }}>
          {isLoading ? (
            <>
              <Skeleton variant='circular' sx={{ width: "1.5rem", height: "1.5rem", mr: 1 }} />
              {label && <Skeleton variant='text' width={23} height={15} sx={{ mr: 1 }} />}
            </>
          ) : (
            <>
              <IconButton size='small'>
                <Icon />
              </IconButton>
              {label && <Typography variant='overline'>{label}</Typography>}
            </>
          )}
        </Box>
      ))}
    </MuiCardActions>
  );
}

interface CardContentProps {
  isLoading: boolean;
  desc: string;
}
function CardContent({ isLoading, desc }: CardContentProps) {
  return (
    <MuiCardContent>
      <Typography
        paragraph
        variant='body2'
        sx={{
          height: "10rem",
          maxHeight: "10rem",
        }}
      >
        {isLoading ? (
          <>
            <Skeleton height={15} variant='text' />
            <Skeleton height={15} variant='text' />
            <Skeleton height={15} variant='text' />
          </>
        ) : (
          desc
        )}
      </Typography>
    </MuiCardContent>
  );
}

interface CardMediaProps {
  src: string;
  isLoading: boolean;
}

const CardMedia = forwardRef<HTMLImageElement, CardMediaProps>(({ isLoading, src }, ref) => {
  if (isLoading) {
    <Skeleton variant='rectangular' height={200} />;
  }
  return <MuiCardMedia ref={ref} component='img' src={src} height={200} alt='title' />;
});

interface CardHeaderProps {
  src: string;
  title: string;
  subTitle: string;
  isLoading: boolean;
}
function CardHeader({ src, title, subTitle, isLoading }: CardHeaderProps) {
  return (
    <MuiCardHeader
      avatar={
        isLoading ? (
          <Skeleton variant='circular' sx={{ width: "3rem", height: "3rem" }} />
        ) : (
          <Avatar sx={{ width: "3rem", height: "3rem" }} src={src} alt='user-avatar' />
        )
      }
      title={isLoading ? <Skeleton height={20} /> : title}
      subheader={isLoading ? <Skeleton height={15} width={50} /> : subTitle}
      sx={{ height: "5rem" }}
    />
  );
}

export { CardHeader, CardMedia, CardContent, CardActions };
