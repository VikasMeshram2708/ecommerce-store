// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";

// interface StoreState {
//   totalProducts: number;
//   increaseQuantity: () => void;
//   decreaseQuantity: () => void;
//   clearCart: () => void;
// }

// export const useStore = create<StoreState>()(
//   persist(
//     (set, get) => ({
//       totalProducts: 1,
//       cartItems: [],

//       increaseQuantity: () =>
//         set((state) => ({ totalProducts: state.totalProducts + 1 })),

//       decreaseQuantity: () =>
//         set((state) => ({
//           totalProducts: Math.max(1, state.totalProducts - 1),
//         })),

//       clearCart: () => {
//         set({
//           totalProducts: 1,
//         });
//       },
//     }),
//     {
//       name: "cart-storage",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );
