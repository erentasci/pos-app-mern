import { Link, useNavigate, useLocation } from "react-router-dom";
import { Badge, Input, message } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const Header = ({ setSearchedText }) => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const logOut = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Çıkış işlemi başarılı.");
    }
  };

  return (
    <div className="mb-6 border-b">
      <header className="flex items-center justify-between gap-10 px-6 py-4">
        <div className="logo">
          <Link to="/">
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </Link>
        </div>
        <div
          className="flex justify-center flex-1 header-search"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}>
          <Input
            size="large"
            placeholder="Ürün Ara..."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e) =>
              setSearchedText(e.target.value.toLocaleLowerCase())
            }
          />
        </div>
        <div className="fixed bottom-0 left-0 z-50 flex items-center justify-between w-screen px-4 py-1 bg-white border-t menu-links gap-7 md:static md:w-auto md:bg-transparent md:border-t-0 md:px-0">
          <Link
            to={"/"}
            className="menu-link flex flex-col hover:text-[#40a9ff] transition-all justify-center items-center">
            <HomeOutlined className="text-xl md:text-2xl" />
            <span className="md:text-xs text-[10px]">Ana Sayfa</span>
          </Link>
          <Badge
            count={cart.cartItems.length}
            offset={[0, 6]}
            className="hidden md:flex">
            <Link
              to={"/cart"}
              className="menu-link flex flex-col hover:text-[#40a9ff] transition-all justify-center items-center">
              <ShoppingCartOutlined className="text-xl md:text-2xl" />
              <span className="md:text-xs text-[10px]">Sepet</span>
            </Link>
          </Badge>
          <Link
            to={"/bills"}
            className="menu-link flex flex-col hover:text-[#40a9ff] transition-all justify-center items-center">
            <CopyOutlined className="text-xl md:text-2xl" />
            <span className="md:text-xs text-[10px]">Faturalar</span>
          </Link>
          <Link
            to={"/customers"}
            className="menu-link flex flex-col hover:text-[#40a9ff] transition-all justify-center items-center">
            <UserOutlined className="text-xl md:text-2xl" />
            <span className="md:text-xs text-[10px]">Müşteriler</span>
          </Link>
          <Link
            to={"/statistic"}
            className="menu-link flex flex-col hover:text-[#40a9ff] transition-all justify-center items-center">
            <BarChartOutlined className="text-xl md:text-2xl" />
            <span className="md:text-xs text-[10px]">İstatistikler</span>
          </Link>
          <div onClick={logOut}>
            <Link className="menu-link flex flex-col hover:text-[#40a9ff] transition-all justify-center items-center">
              <LogoutOutlined className="text-xl md:text-2xl" />
              <span className="md:text-xs text-[10px]">Çıkış</span>
            </Link>
          </div>
        </div>
        <Badge
          count={cart.cartItems.length}
          offset={[0, 6]}
          className="flex md:hidden">
          <Link
            to={"/"}
            className="menu-link flex flex-col hover:text-[#40a9ff] transition-all justify-center items-center">
            <ShoppingCartOutlined className="text-2xl" />
            <span className="md:text-xs text-[10px]">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
