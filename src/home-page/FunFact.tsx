import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

interface FunFactProps {
  fact: string;
  imgSource: string;
  imgPosition: 'left' | 'right';
}

function FunFact({ fact, imgSource, imgPosition }: FunFactProps) {
  return (
    <Box
      sx={{
        margin: '2em 5em 2em 5em',
        display: 'flex',
        alignItems: 'center',
        p: 1,
        borderRadius: 10,
        bgcolor: 'background.paper',
        flexDirection: imgPosition === 'right' ? 'row-reverse' : 'row',
      }}
    >
      <Avatar
        src={imgSource}
        alt="fun fact"
        sx={{
          width: 150,
          height: 150,
          borderRadius: 99999,
          border: '1px solid black',
        }}
      />
      <Typography
        sx={{
          fontSize: '20px',
          fontFamily: 'Karla',
          fontWeight: '700',
          ml: 2,
        }}
      >
        {fact}
      </Typography>
    </Box>
  );
}

export default FunFact;
