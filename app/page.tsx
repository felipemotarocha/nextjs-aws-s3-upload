import Link from "next/link";
import { Button } from "./_components/ui/button";

const Home = () => {
  return (
    <div className="space-x-2 p-5">
      <Button asChild>
        <Link href="/search-user">Buscar usuário</Link>
      </Button>

      <Button asChild>
        <Link href="/create-user">Criar usuário</Link>
      </Button>
    </div>
  );
};

export default Home;
