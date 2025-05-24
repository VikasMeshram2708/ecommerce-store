import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  totalProducts: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}
export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      totalProducts: 1,
      increaseQuantity: () =>
        set((state) => ({ totalProducts: state.totalProducts + 1 })),
      decreaseQuantity: () =>
        set((state) =>
          state.totalProducts > 0
            ? { totalProducts: state.totalProducts - 1 }
            : state
        ),
    }),
    {
      name: "cart-storage",
    }
  )
);
// export const useStore = create<StoreState>((set) => ({
//   totalProducts: 0,
//   increaseQuantity: () =>
//     set((state) => ({ totalProducts: state.totalProducts + 1 })),
//   decreaseQuantity: () =>
//     set((state) =>
//       state.totalProducts > 0
//         ? { totalProducts: state.totalProducts - 1 }
//         : state
//     ),
// }));
