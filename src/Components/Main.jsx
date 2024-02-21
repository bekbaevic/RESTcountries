import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries } from '../getData/getDataCountries'
import { Box, Button, Card, CardBody, CardHeader, Grid, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { setAlertItem, setSearchCountries, setSelectedRegion } from '../features/countries.scile'
const Main = () => {
    const [inputValue, setInputValue] = useState('')
    const country = useSelector(state => state.country)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    useEffect(() => { getCountries(country.url, dispatch) }, [])


    function searchCountry(x) {
        setInputValue(x)
        if (x.length === 0) {
            dispatch(setSearchCountries(country.selectedRegion.length !== 0 ? country.selectedRegion : country.countriesData))
        }
        dispatch(setSearchCountries((country.selectedRegion.length !== 0 ? country.selectedRegion : country.countriesData).filter(item => item.name.common.toLowerCase().indexOf(x) > -1)))
    }

    const selectRegion = (x) => {
        dispatch(setSelectedRegion(country.countriesData.filter(item => item.region === x.name)))
        setInputValue('')
    }

    function setAlert(item) {
        dispatch(setAlertItem(country.countriesData.find(x => x === item)))
        onOpen()
    }

    function closeAlert() {
        dispatch(setAlertItem([]))
        onClose()
    }

    return (
        <Box marginY={'20px'}>
            <Box display={'flex'} flexDirection={{ base: 'column', md: 'row' }} gap={'10px'} justifyContent={{ sm: 'center', md: 'space-between' }} marginBottom={'20px'}>
                <Box justifyContent={'space-between'} display={'flex'} gap={'7px'}>
                    <Box className='grid base:grid-cols-3 justify-stretch w-full md:grid-cols-6 gap-x-2 gap-y-1'>
                        <Button onClick={() => dispatch(setSelectedRegion([]))} rounded={'sm'}>
                            All
                        </Button>
                        {country.regions.map(item => (
                            <Button key={item.id} onClick={() => selectRegion(item)} rounded={'sm'}>
                                {item.name}
                            </Button>
                        ))}
                    </Box>
                </Box>
                <Input value={inputValue} onChange={e => searchCountry(e.target.value.toLowerCase())} width={{ sm: '100%', md: '300px' }} rounded={'sm'} minWidth={'100px'} placeholder='Search...' />
            </Box>
            <Grid className='base:grid-cols-2 w-full lg:grid-cols-4 md:grid-cols-3 base:gap-4 sm:gap-8 ' >
                {country.countriesData.length === 0 ? <div>LOADING...</div> :
                    (inputValue.length !== 0 ? country.searchCountries : (country.selectedRegion.length !== 0 ? country.selectedRegion : country.countriesData)).map(item => (
                        <Card onClick={() => setAlert(item)} className='hover:scale-[101%]' cursor={'pointer'} boxShadow={'lg'} rounded={'sm'} key={item.name.common}>
                            <CardHeader padding={'0'}>
                                <Image roundedTop={"sm"} src={item.flags.png} width={"full"} className='base:h-[100px] sm:h-[150px] md:h-[150px] ' />
                            </CardHeader>
                            <CardBody display={'flex'} flexDirection={'column'} gap={'16px'} paddingTop={'10px'} textAlign={'left'}>
                                <Text className='base:text-[16px] sm:text-[22px] md:text-[24px]' fontWeight={'700'}>{item.name.common}</Text>
                                <div>
                                    <Text className='base:text-[12px] sm:text-[14px] md:text-[16px]'>Population: {item.population}</Text>
                                    <Text className='base:text-[12px] sm:text-[14px] md:text-[16px]'>Region: {item.region}</Text>
                                    <Text className='base:text-[12px] sm:text-[14px] md:text-[16px]'>The capital: {item.capital}</Text>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                }
            </Grid >

            {country.alertItem.length === 0 ? "" : <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent rounded={'sm'} minWidth={{ sm: '300px', md: '700px' }}>
                    <ModalCloseButton onClick={() => closeAlert()} />
                    <Box display={'flex'} alignItems={'center'} className='base:flex-col md:flex-row'>
                        <Box padding={'20px'} paddingRight={'0'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <img src={country.alertItem.flags.png} alt="" className='h-full' />
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} margin={'20px'}>
                            <Text fontSize={'20px'} fontWeight={'700'}>{country.alertItem.name.common}</Text>
                            <Text>Population: {country.alertItem.population}</Text>
                            <Text>Region: {country.alertItem.region}</Text>
                            <Text>Subregion: {country.alertItem.subregion}</Text>
                            <Text>The capital: {country.alertItem.capital}</Text>
                            <Text>Currency: {Object.values(country.alertItem.currencies)[0].name}</Text>
                            <Text>Language: {Object.values(country.alertItem.languages).join(", ")}</Text>
                        </Box>
                    </Box>
                </ModalContent>
            </Modal>}
        </Box >
    )
}

export default Main 