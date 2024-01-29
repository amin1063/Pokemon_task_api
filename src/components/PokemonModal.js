import React from 'react'
import { Box, IconButton, Modal, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { capitalizeFirstLetter } from './Capitalize';
import '../App.css';


const PokemonModal = ({ open, modalClose, cardId, pokemonDetails }) => {


  return (
    <Modal
      open={open}
      onClose={modalClose}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          justifyContent: 'center',
          height: '80vh',
          width: '70vw',
          display: 'flex',
          justifyContent: 'center',
          margin: '0 auto',
          mt: 5,
          borderRadius: '30px',
          border: 'none',
        }} >
        <Box sx={{ display: 'flex', width: '100%','@media (max-width: 768px)': {
          flexDirection: 'column'} }}>
          <div style={{ padding: '20px', width: '40%',position:'relative' }}>
          <IconButton onClick={modalClose} sx={{ position: 'absolute', left: '7px' }}>
              <CloseIcon />
            </IconButton>
            <img
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${cardId}.svg`}
              alt={"Image not fount"}
              className='modal-img'
            />
          </div>
          <Box className='modal-detail'>
          
            <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center', mt: 2, textDecoration: 'underline' }}>Stats</Typography>
            {pokemonDetails?.length && pokemonDetails.map((item, i) => (
              <Stack key={i} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', mt: 2 }}>
                <Typography variant='h6' sx={{ width: '50%', color: 'gray', fontWeight: '700' }}>{capitalizeFirstLetter(item?.stat?.name) || '-'}</Typography>
                <Typography variant='h6' sx={{ width: '50%' }} >{item?.base_stat || 0} </Typography>
              </Stack>
            ))}
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default PokemonModal