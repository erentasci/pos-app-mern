import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Carousel, Checkbox, Form, Input, message } from "antd";
import AuthCarousel from "../../components/auth/AuthCarousel";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const user = await res.json();

      if (res.status === 200) {
        localStorage.setItem(
          "posUser",
          JSON.stringify({
            username: user.username,
            email: user.email,
          })
        );
        message.success("Giriş işlemi başarılı.");
        navigate("/");
      } else if (res.status === 404) {
        message.error("Kullanıcı bulunamadı!");
      } else if (res.status === 403) {
        message.error("Şifre yanlış!");
      }
      setLoading(false);
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="relative flex flex-col justify-center w-full h-full px-10 xl:px-20">
          <h1 className="mb-2 text-5xl font-bold text-center">LOGO</h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              remember: false,
            }}
            loading={loading}>
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "E-mail Alanı Boş Bırakılamaz!",
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Şifre Alanı Boş Bırakılamaz!",
                },
              ]}>
              <Input.Password />
            </Form.Item>
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex items-center justify-between">
                <Checkbox>Remember me</Checkbox>
                <Link>Forgot Password?</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large">
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="absolute left-0 flex justify-center w-full bottom-10">
            Henüz bir hesabınız yok mu?&nbsp;
            <Link to="/register" className="text-blue-600">
              Şimdi kaydol
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
          <div className="flex items-center w-full h-full">
            <div className="w-full">
              <Carousel className="!h-full px-6" autoplay>
                <AuthCarousel
                  img="/images/responsive.svg"
                  title="Responsive"
                  desc="Tüm Cihaz Boyutlarıyla Uyumluluk"
                />
                <AuthCarousel
                  img="/images/statistic.svg"
                  title="İstatistikler"
                  desc="Geniş Tutulan İstatistikler"
                />
                <AuthCarousel
                  img="/images/customer.svg"
                  title="Müşteri Memnuniyeti"
                  desc="Deneyim Sonunda Üründen Memnun Müşteriler"
                />
                <AuthCarousel
                  img="/images/admin.svg"
                  title="Yönetici Paneli"
                  desc="Tek Yerden Yönetim"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
