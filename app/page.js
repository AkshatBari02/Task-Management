import TaskManager from "@components/TaskManager";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col not-copy">
      <h1 className="head_text text-center">
        Create & Manage
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Your Daily Tasks</span>
      </h1>
      <TaskManager />
    </section>
  );
};

export default Home;
