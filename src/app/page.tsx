import ItemService from '@/app/api/item/service';
import { List } from '@/components/checklist/List';

const Home = async function Home() {
  const items = await ItemService.find();
  return <List defaultItems={items} />;
};

export default Home;
