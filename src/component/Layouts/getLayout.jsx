import DashBoard_Layout from "./Dashboard_Layout";

const getLayout = (type, Component) => {
  switch (type) {
    case "dashboard":
      return (
        <DashBoard_Layout >
          <Component />
        </DashBoard_Layout>
      );

    default:
      return <Component />;
  }
};

export default getLayout;
