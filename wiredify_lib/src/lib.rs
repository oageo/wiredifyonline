use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn wiredify(s: String) -> String {
    wiredify::wiredify(s)
}
