<?php

namespace App\Services;

class PuppeteerService
{
    public function crawlLinks()
    {
        // Đường dẫn đến file Node.js
        $nodeScript = base_path('node-scripts/crawler.js');

        // Chạy Puppeteer bằng Node.js
        $output = shell_exec("node $nodeScript");

        // Chuyển đổi kết quả từ JSON hoặc xử lý chuỗi trả về
        $links = json_decode($output, true);

        return $links;
    }
}
