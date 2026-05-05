import { Head } from '@inertiajs/react';
import { useState } from 'react';
import HeroPattern from '@/components/hero/hero-pattern';
import FacilityDialog from '@/components/pages/facility/dialog';
import FacilityGrid from '@/components/pages/facility/grid';
import FacilityHeader from '@/components/pages/facility/header';
import { facilities } from '@/data/facility';
import Layout from '@/layouts/default';

import type { FacilityItem } from '@/types/facility';

export default function Facility() {
    const [selected, setSelected] = useState<FacilityItem | null>(null);

    return (
        <>
            <Head title="Fasilitas" />

            <Layout>
                <HeroPattern />

                <FacilityHeader />

                <FacilityGrid data={facilities} onSelect={setSelected} />

                <FacilityDialog
                    item={selected}
                    onClose={() => setSelected(null)}
                />
            </Layout>
        </>
    );
}
