import { Box, Chip, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetails } from '../fetchServices';
import PokemonModal from './PokemonModal';
import { capitalizeFirstLetter } from './Capitalize';
import { baseUrl } from '../config';

const PokemonInfo = ({data}) => {

    const [openModal,setOpenModal] = useState(false);
    const [details,setDetails] = useState([])
    const [cardId,setCardId] = useState('')
    const [colorIndex,setColorIndex] = useState(0)
    const colors = ['#d45c28','#f2e70c','#0cc0f2','#0711a3','#8c1533','#2ba120','#128c6c','#b31ba6','#52514f']
 
    useEffect(() => {
        let findId,id,color
        if(data){
            findId = data.url?.split('/')
            id = findId[findId?.length -2]
        }
        color =  Math.floor((Math.random() * 8) + 1)
        setColorIndex(color)
        setCardId(id)
    }, [data]);

     const fetchDetailsData = async () => {
        try {
            const response = await fetch(`${baseUrl}/pokemon/${cardId}`);
            const result = await response.json();
            setDetails(result)
        } catch (error) {
            console.log("error", error);
        } 
    };
    
    useEffect(()=>{
        fetchDetailsData()
    },[cardId])

    const modalClose =()=>{
        setOpenModal(false)
    }

    return (
        <>
            <PokemonModal 
                open={openModal} 
                modalClose={modalClose}
                cardId={cardId}
                pokemonDetails={details?.stats} 
            />
            <Box
                sx={{
                    mt:3,
                    borderRadius:'30px',
                    height:'190px',
                    width:'290px',
                    overflow:'hidden',
                    boxShadow: '1px 7px 10px -5px rgba(77,73,77,1)'
                }}
                onClick={()=>setOpenModal(true)}
            >
                
                <Stack direction={'row'} sx={{ p:1,backgroundColor:colors[colorIndex],height:'100%',pt:4,position:'relative' }}>
                <Chip  sx={{mt:1,position:'absolute',right:'10px',top:'0px',color:'white'}} label={cardId} />

                    <div style={{ width:'50%',marginTop:'10px',marginLeft:'10px' }}>
                        <Typography variant='h5' color='white' fontWeight='700'>{capitalizeFirstLetter(data?.name)}</Typography>
                        {details && details?.types?.map((item,i)=>(
                            <Stack direction={'column'} key={i}>
                                <Chip sx={{color:'white',width:'55%',mt:1,backdropFilter:'blur(8px)'}} key={i} 
                                label={capitalizeFirstLetter(item?.type?.name)} />
                            </Stack>
                        ))}
                    </div>
                    <div style={{ width: '50%'}}>
                        <img
                        src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${cardId}.svg`} 
                        alt={data?.name || ""}
                        style={{height:'auto',width:'100%',objectFit:'contain',paddingBottom:'20px'}}
                        />
                    </div>
                </Stack>
            </Box>
        </>
        
    )
}

export default PokemonInfo