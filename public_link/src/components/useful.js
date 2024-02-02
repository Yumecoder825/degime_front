/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";
import { Link } from "react-router-dom";

const Useful = () => {
  return (
    <div className="useful">
      <ul className="p-6 divide-y divide-sky-700">
        {/* {#each people as person}
                <!-- Remove top/bottom padding when first/last child --> */}
        <li className="flex py-4 first:pt-0 last:pb-0">
          <img
            className="h-10 w-10 rounded-full"
            src="{person.imageUrl}"
            alt=""
          />
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-medium text-slate-900">Dodo</p>
            <p className="text-sm text-slate-500 truncate">dodo@gmail.com</p>
          </div>
        </li>
        <li className="flex py-4 first:pt-0 last:pb-0">
          <img
            className="h-10 w-10 rounded-full"
            src="{person.imageUrl}"
            alt=""
          />
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-medium text-slate-900">Dodo</p>
            <p className="text-sm text-slate-500 truncate">dodo@gmail.com</p>
          </div>
        </li>
        <li className="flex py-4 first:pt-0 last:pb-0">
          <img
            className="h-10 w-10 rounded-full"
            src="{person.imageUrl}"
            alt=""
          />
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-medium text-slate-900">Dodo</p>
            <p className="text-sm text-slate-500 truncate">dodo@gmail.com</p>
          </div>
        </li>
        {/* {/each} */}
      </ul>

      <table>
        <tbody>
          {/* {#each people as person}
                <!-- Use a white background for odd rows, and slate-50 for even rows --> */}
          <tr className="odd:bg-white even:bg-slate-50">
            <td>okkkk</td>
            <td>pooooo</td>
            <td>poo@gmail.com</td>
          </tr>
          <tr className="odd:bg-white even:bg-slate-50">
            <td>okkkk</td>
            <td>pooooo</td>
            <td>poo@gmail.com</td>
          </tr>
          <tr className="odd:bg-white even:bg-slate-50">
            <td>okkkk</td>
            <td>pooooo</td>
            <td>poo@gmail.com</td>
          </tr>
          <tr className="odd:bg-white even:bg-slate-50">
            <td>okkkk</td>
            <td>pooooo</td>
            <td>poo@gmail.com</td>
          </tr>
          {/* {/each} */}
        </tbody>
      </table>

      <Link
        to="#"
        className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500"
      >
        <div className="flex items-center space-x-3">
          <svg
            width="34"
            height="35"
            viewBox="0 0 34 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="16.9604"
              cy="16.063"
              rx="14.8393"
              ry="14.9302"
              fill="url(#paint0_linear_889_1161)"
            />
            <path
              d="M22.4836 21.9942L23.1428 17.7802H19.0192V15.0468C19.0192 13.8936 19.5942 12.7689 21.4411 12.7689H23.3171V9.18134C23.3171 9.18134 21.6153 8.89661 19.9891 8.89661C16.5915 8.89661 14.3728 10.9153 14.3728 14.5684V17.7802H10.5977V21.9942H14.3728V32.1819C15.1308 32.2986 15.9061 32.3584 16.696 32.3584C17.4859 32.3584 18.2613 32.2986 19.0192 32.1819V21.9942H22.4836Z"
              fill="white"
            />
            <defs>
              <linearGradient
                id="paint0_linear_889_1161"
                x1="16.9604"
                y1="1.13281"
                x2="16.9604"
                y2="30.9047"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#18ACFE" />
                <stop offset="1" stop-color="#0163E0" />
              </linearGradient>
            </defs>
          </svg>
          <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">
            New project
          </h3>
        </div>
        <p className="text-slate-500 group-hover:text-white text-sm">
          Create a new project from a variety of starting templates.
        </p>
      </Link>

      <Link
        to="#"
        className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500"
      >
        <div className="flex items-center space-x-3">
          <svg
            width="34"
            height="35"
            viewBox="0 0 34 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="16.9604"
              cy="16.063"
              rx="14.8393"
              ry="14.9302"
              fill="url(#paint0_linear_889_1161)"
            />
            <path
              d="M22.4836 21.9942L23.1428 17.7802H19.0192V15.0468C19.0192 13.8936 19.5942 12.7689 21.4411 12.7689H23.3171V9.18134C23.3171 9.18134 21.6153 8.89661 19.9891 8.89661C16.5915 8.89661 14.3728 10.9153 14.3728 14.5684V17.7802H10.5977V21.9942H14.3728V32.1819C15.1308 32.2986 15.9061 32.3584 16.696 32.3584C17.4859 32.3584 18.2613 32.2986 19.0192 32.1819V21.9942H22.4836Z"
              fill="white"
            />
            <defs>
              <linearGradient
                id="paint0_linear_889_1161"
                x1="16.9604"
                y1="1.13281"
                x2="16.9604"
                y2="30.9047"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#18ACFE" />
                <stop offset="1" stop-color="#0163E0" />
              </linearGradient>
            </defs>
          </svg>
          <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">
            New project
          </h3>
        </div>
        <p className="text-slate-500 group-hover:text-white text-sm">
          Create a new project from a variety of starting templates.
        </p>
      </Link>

      <ul role="list">
        {/* {#each people as person} */}
        <li className="group/item hover:bg-slate-100 ...">
          <img src="{person.imageUrl}" alt="" />
          <div>
            <Link to="{person.url}">abc</Link>
            <p className="before:content-['I am here']">I am a person</p>
          </div>
          <Link
            className="group/edit invisible hover:bg-slate-200 group-hover/item:visible ..."
            to="tel:{person.phone}"
          >
            <span className="group-hover/edit:text-gray-700 ...">Call</span>
            <svg className="group-hover/edit:translate-x-0.5 group-hover/edit:text-slate-500 ...">
              {/* <!-- ... --> */}
            </svg>
          </Link>
        </li>
        {/* {/each} */}
      </ul>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-gray-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
    </div>
  );
};

export default Useful;
