import { Fragment } from "react";
import type { DummyLayoutComponent, DummyLayoutProps } from "types/dummy/dummy.types";

const DummyLayout: DummyLayoutComponent = (props: DummyLayoutProps) => {
  const { title } = props;

  return (
    <Fragment>
      <div className="h-[150vh] flex flex-col pt-24">
        <h1 className="text-3xl font-bold text-center mt-8">{title}</h1>
        <p className="mt-4">
          This is a sample portfolio built with React and Tailwind CSS. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sunt, dolores doloribus possimus sint distinctio, laudantium quia inventore recusandae esse
          molestias dolore cumque laboriosam voluptas repudiandae a, harum ullam expedita. Maiores?
        </p>
        <p className="mt-4">
          This is a sample portfolio built with React and Tailwind CSS. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sunt, dolores doloribus possimus sint distinctio, laudantium quia inventore recusandae esse
          molestias dolore cumque laboriosam voluptas repudiandae a, harum ullam expedita. Maiores?
        </p>
        <p className="mt-4">
          This is a sample portfolio built with React and Tailwind CSS. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sunt, dolores doloribus possimus sint distinctio, laudantium quia inventore recusandae esse
          molestias dolore cumque laboriosam voluptas repudiandae a, harum ullam expedita. Maiores?
        </p>
        <p className="mt-4">
          This is a sample portfolio built with React and Tailwind CSS. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sunt, dolores doloribus possimus sint distinctio, laudantium quia inventore recusandae esse
          molestias dolore cumque laboriosam voluptas repudiandae a, harum ullam expedita. Maiores?
        </p>
        <p className="mt-4">
          This is a sample portfolio built with React and Tailwind CSS. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sunt, dolores doloribus possimus sint distinctio, laudantium quia inventore recusandae esse
          molestias dolore cumque laboriosam voluptas repudiandae a, harum ullam expedita. Maiores?
        </p>
        <p className="mt-4">
          This is a sample portfolio built with React and Tailwind CSS. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sunt, dolores doloribus possimus sint distinctio, laudantium quia inventore recusandae esse
          molestias dolore cumque laboriosam voluptas repudiandae a, harum ullam expedita. Maiores?
        </p>
        <p className="mt-4">
          This is a sample portfolio built with React and Tailwind CSS. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sunt, dolores doloribus possimus sint distinctio, laudantium quia inventore recusandae esse
          molestias dolore cumque laboriosam voluptas repudiandae a, harum ullam expedita. Maiores?
        </p>
        <p className="mt-4">
          This is a sample portfolio built with React and Tailwind CSS. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sunt, dolores doloribus possimus sint distinctio, laudantium quia inventore recusandae esse
          molestias dolore cumque laboriosam voluptas repudiandae a, harum ullam expedita. Maiores?
        </p>
        <p className="mt-4">
          This is a sample portfolio built with React and Tailwind CSS. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sunt, dolores doloribus possimus sint distinctio, laudantium quia inventore recusandae esse
          molestias dolore cumque laboriosam voluptas repudiandae a, harum ullam expedita. Maiores?
        </p>
        <p className="mt-4">
          This is a sample portfolio built with React and Tailwind CSS. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sunt, dolores doloribus possimus sint distinctio, laudantium quia inventore recusandae esse
          molestias dolore cumque laboriosam voluptas repudiandae a, harum ullam expedita. Maiores?
        </p>
      </div>
    </Fragment>
  );
};

export default DummyLayout;
