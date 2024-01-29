import { Box, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PokemonInfo from './PokemonInfo'
import { fetchData, fetchType, fetchTypeById } from '../fetchServices'
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import { capitalizeFirstLetter } from './Capitalize';

const CardBox = () => {
    const dispatch = useDispatch();
    const pokemonData = useSelector((state) => state.cardItems.pokemonData);
    const pokemonTypes = useSelector((state) => state.cardItems.pokemonTypes);
    const pokemonTypesById = useSelector((state) => state.cardItems.pokemonTypesById);
    const [searchValue, setSearchValue] = useState('')
    const [data, setData] = useState([])
    const [offset, setOffSet] = useState(0)
    const [selectedOption, setSelectedOption] = useState('');
    const [typeOpen, setTypeOpen] = useState(false)

    const handleScroll =()=>{
        if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
        fetchData(dispatch, offset);
        setOffSet((prev) => prev + 16)
        }
    }

    useEffect(() => {
        fetchData(dispatch, offset);
        fetchType(dispatch);
        setOffSet((prev) => prev + 16)
    }, []);

    useEffect(()=>{
        if(selectedOption?.length){
            setData(pokemonTypesById)
        }
        else if(searchValue?.length){
            let searchData = data.filter((item,i)=> item.name.includes(searchValue))
            setData(searchData)
        }
        else{
            let list = new Set([...data,...pokemonData])
            setData([...list])
        }
    },[searchValue,selectedOption,pokemonTypesById])

    useEffect(() => {
        if (pokemonData?.length) {
            setData([...data,...pokemonData]);
        }
    }, [pokemonData]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const fetchNextPageData =()=>{
        window.addEventListener('scroll',handleScroll)
    }

    useEffect(()=>{
        if(selectedOption?.length){
            fetchTypeById(dispatch,selectedOption)
        }
    },[selectedOption])

    return (
        <>
            <Box  >
                <Container sx={{ml:0}}>
                    <Stack gap={5} direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between' ,pt:3}}>
                        <TextField
                            label="Search here..."
                            variant="outlined"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            sx={{minWidth:"50%"}}
                        />
                        <FormControl sx={{ minWidth: "50%" }}>
                            <InputLabel id="demo-controlled-open-select-label">Select Type</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={typeOpen}
                                onClose={() => setTypeOpen(false)}
                                onOpen={() => setTypeOpen(true)}
                                value={selectedOption}
                                label="Select Type"
                                onChange={handleChange}
                            >
                                {pokemonTypes?.length && pokemonTypes.map((items,i) => (
                                    <MenuItem key={i} value={items?.name}>{capitalizeFirstLetter(items?.name)}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Grid container spacing={8} sx={{ mt: 2, ml: 1 }}>
                    <InfiniteScroll
                                className="infinite-content"
                                dataLength={data?.length}
                                next={fetchNextPageData}
                                hasMore={true}
                                loader={
                                    <Box sx={{ width:'100%',textAlign: 'center',mt:2 }} >
                                        <CircularProgress />
                                        <Typography variant='h6' color='primary'>Loading...</Typography>
                                    </Box>
                                }
                            >
                        {data?.length ? data.map((item,i) => {
                            return (
                                <Grid key={i} item xs={12} sm={6} md={4} lg={3} sx={{ padding: '0px !important',overflow:'hidden' }}>
                                    <PokemonInfo data={selectedOption?.length ? item?.pokemon : item} />
                                </Grid>
                            )
                        }): null}
                    </InfiniteScroll>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default CardBox