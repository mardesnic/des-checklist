import { getItems } from '@/lib/api/itemApi';
import { List } from '@/components/checklist/List';

const Home = async function Home() {
  const items = await getItems();
  return <List defaultItems={items} />;
};

export default Home;
