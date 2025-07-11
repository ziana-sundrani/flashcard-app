import CardInput from './components/CardInput'
import {Container} from '@mui/material'
export default function Homepage() {
  return (
    <Container sx={{p:10, bgcolor: 'secondary'}}>
        <CardInput />
    </Container>
  );
}

