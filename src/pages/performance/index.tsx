import { Box, Text, theme, Flex, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import useSWR from "swr";
import { getAuthCookie } from "../../utils/auth-cookies";
import dynamic from "next/dynamic";
import { api } from "../../services/api";
import { useQuery } from "react-query";


 const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

export default function Performance() {

  const router = useRouter()

  
  
  const fetcher = (url: any) => fetch(url).then((r) => r.json());

/*   const { data: userData, mutate: mutateUser } = useSWR(`/api/user/get/${id}`, fetcher);
  const { data: user } = useSWR('/api/user', fetcher);
  const { data: rewards, mutate: mutateReward } = useSWR('/api/reward/getAll', fetcher);
  const { data: badges, mutate: mutateBadge} = useSWR('/api/badges/getAll', fetcher);
  const { data: performancePlayer} = useSWR(`/api/performance/${id}`, fetcher); */
  //const { data: performance} = useSWR(`/api/performance`, fetcher);

  const { data: performance, isLoading, error} = useQuery('players', async () => {
    const response = await api.get('/performance')
    
    const players = response.data[1]
    return players;
  })


  const seriesColors = ['#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#ecf0f1',
  '#95a5a6',
  '#833471',
  '#12CBC4',
  '#1B1464',
  '#ED4C67',
  '#9980FA',
  '#C4E538',
  '#ED4C67',
  '#ff4d4d'
 ]
    


  const options = {
    colors:seriesColors,
    chart: {
      theme: 'dark',
      toolbar: {
        show: true,
        theme: 'dark'
      },
      zoom: {
        enabled: true,
      },
      foreColor: theme.colors.gray[500],
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'bottom',
      horizontalAlign: 'left'
    },
    tooltip: {
      enabled: true,
      theme: 'dark'
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        color: theme.colors.gray[600]
      },
      axisTicks: {
        color: theme.colors.gray[600]
      },
    },
    fill: {
      opacity: 0.3,
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
  };
 
  
  
   

  


  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <VStack>
        
        <Flex w='100%'>
          <Box
            borderRadius={8}
            bg="gray.800"
            p={["6", "8"]}
            mr={3}
            w='100%'
            >
            <Text>Performance</Text>
            {!isLoading ? <Chart options={options}  series={performance} type="area" height={512} width={960}/> : 'Carregando ... '}
          </Box>
        </Flex>
        </VStack>
      </Flex>
    </Box>
  );
}

export async function getServerSideProps({res, req, params}) {
  const token = getAuthCookie(req);
  if(!token){
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }
  
  return { props: { token: token || null } };
}