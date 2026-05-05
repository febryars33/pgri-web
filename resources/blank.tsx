import { Box } from '@chakra-ui/react';
import StudentKeadaanChart from '@/components/chart/StudentKeadaanChart';
import Layout from '@/layouts/default';

export default function Blank() {
    return (
        <Layout>
            <Box minH="100vh" py="20">
                <StudentKeadaanChart />
            </Box>
        </Layout>
    );
}
