// import React from "react";
// import { Formik, Field, Form } from "formik";

// const RadioButton = () => {
//   return (
//     <Formik
//       initialValues={{
//         position_id: "",
//       }}
//       onSubmit={async (values) => {
//         await new Promise((r) => setTimeout(r, 500));
//         alert(JSON.stringify(values, null, 2));
//       }}
//     >
//       {({ values }) => (
//         <Form>
//           <div id="my-radio-group">Picked</div>
//           <div role="group" aria-labelledby="my-radio-group">
//             <label>
//               <Field type="radio" name="picked" value="One" />
//               One
//             </label>
//             <label>
//               <Field type="radio" name="picked" value="Two" />
//               Two
//             </label>
//             <div>Picked: {values.position_id}</div>
//           </div>
//           <button type="submit">Submit</button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default RadioButton;
