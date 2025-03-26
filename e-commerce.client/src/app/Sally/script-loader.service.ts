import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {

  constructor() { }

  // دالة لتحميل السكربت
  loadScript(scriptUrl: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // التحقق إذا كان السكربت موجودًا مسبقًا
      const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
      if (existingScript) {
        // إذا كان السكربت موجودًا بالفعل نعيده مباشرة
        resolve('Script already loaded');
        return;
      }

      // إنشاء عنصر سكربت جديد
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;

      script.onload = () => {
        console.log(`${scriptUrl} loaded successfully!`);
        resolve(scriptUrl); // عند التحميل بنجاح
      };

      script.onerror = (error) => {
        console.error(`Error loading ${scriptUrl}`, error);
        reject(error); // عند حدوث خطأ
      };

      // إضافة السكربت إلى الـ body في الصفحة
      document.body.appendChild(script);
    });
  }
}
