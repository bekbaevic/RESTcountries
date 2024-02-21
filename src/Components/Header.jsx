import { BiSun } from "react-icons/bi";
import { BiMoon } from "react-icons/bi";
import { Box, Button, Input, Select, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from "react-redux";

const Header = () => {
    const country = useSelector(state => state.country)
    
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} padding={'10px'} marginTop={'0px'} borderBottom={'1px'}>
            <Text fontWeight={'600'} display={'flex'} fontSize={'20px'}><span className="text-[#3182CE]">REST</span>Countries</Text>
            <Box display={'flex'} alignItems={'center'} gap={'20px'}>
                
                <Button onClick={toggleColorMode} fontSize={'18px'} padding={'8px'} rounded={'full'} width={'40px'} height={'40px'}>
                    {colorMode === 'light' ? <BiMoon /> : <BiSun />}
                </Button>
            </Box>
        </Box>
    )
}

export default Header