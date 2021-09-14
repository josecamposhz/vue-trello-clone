// export const querySnapshot = (snap) => {
//   let docs = [];

//   snap.forEach((doc) => {
//     docs.push({
//       id: doc.id,
//       ...doc.data(),
//     });
//   });

//   return docs;
// };

export const docData = (doc) => ({
  id: doc.id,
  ...doc.data(),
});

export function doSnapshot(querySnapshot) {
  const docs = [];
  querySnapshot.forEach((doc) => {
    docs.push(docData(doc));
  });
  return docs;
}
