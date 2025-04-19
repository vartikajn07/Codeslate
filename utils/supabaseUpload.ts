import { supabase } from "@/services/supabaseClient";

//uploading to supabase bucker
export const uploadImageToSupabase = async (file: File) => {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("image-snippets")
    .upload(fileName, file);

  if (error) {
    console.error("Upload error:", error.message);
    throw error;
  }

  const { data: urlData } = supabase.storage
    .from("image-snippets")
    .getPublicUrl(fileName);

  const publicUrl = urlData.publicUrl;

  return publicUrl;
};
