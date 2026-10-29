<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Attachment;
use App\Models\Backoffice\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class AttachmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $attachments = [
            [
                'id' => 1,
                'title' => 'Landing page',
                'description' => null,
                'file_name' => 'Capture d’écran 2025-12-16 214233.png',
                'file_path' => 'attachments/nm0CPbOZvWj95DeOvjuWLkzducc1lCHckIdc7P7e.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 182423,
            ],
            [
                'id' => 2,
                'title' => 'Authentication page',
                'description' => null,
                'file_name' => 'Capture d’écran 2025-12-16 214252.png',
                'file_path' => 'attachments/unfk9LTkKYK2MCGtHrJ28xAMTIRph6h4SW2HNR4S.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 213471,
            ],
            [
                'id' => 3,
                'title' => 'Project list page',
                'description' => null,
                'file_name' => 'Capture d’écran 2025-12-16 214313.png',
                'file_path' => 'attachments/EriLItMSMGiZZMDCMHbMDX2AfPu6pMYwIvUcUfP5.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 95491,
            ],
            [
                'id' => 4,
                'title' => 'Project creation page',
                'description' => null,
                'file_name' => 'Capture d’écran 2025-12-16 214344.png',
                'file_path' => 'attachments/mJuhtNPpXZamFvnJ0cow1MUv9Dk3sGRlYIWAIilR.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 98558,
            ],
            [
                'id' => 5,
                'title' => 'Project details page',
                'description' => null,
                'file_name' => 'Capture d’écran 2025-12-16 214413.png',
                'file_path' => 'attachments/QSiyb4IuhvQIGJqO3ZHPXl62Usywt3RxeEl1qLQr.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 114600,
            ],
            [
                'id' => 6,
                'title' => 'Logs list page',
                'description' => null,
                'file_name' => 'Capture d’écran 2025-12-16 214427.png',
                'file_path' => 'attachments/drVa7LlGcz1ORLsiEscmak3Kzc62Hu5ryUUUNVdG.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 125561,
            ],
            [
                'id' => 7,
                'title' => 'Landing page',
                'description' => null,
                'file_name' => 'Capture d’écran 2025-12-16 215200.png',
                'file_path' => 'attachments/PcEyOuD1nHV8BMB4Eu5IVtVL1KWTRvAkDdmmDbbW.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 75209,
            ],
            [
                'id' => 8,
                'title' => 'Sandbox list',
                'description' => null,
                'file_name' => 'Capture d’écran 2025-12-16 215749.png',
                'file_path' => 'attachments/JUPKbR2vqANbbwaJc8O6iW4czbfgZZXpds6523r9.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 164559,
            ],
            [
                'id' => 9,
                'title' => 'Terms',
                'description' => null,
                'file_name' => 'Capture d’écran 2025-12-16 215807.png',
                'file_path' => 'attachments/4ZW2L4HXTUrHPVxrqtIV0M9UqH46e80Umlg9n0bi.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 148592,
            ],
            [
                'id' => 10,
                'title' => 'Authentication page',
                'description' => null,
                'file_name' => 'Capture d’écran 2025-12-16 215843.png',
                'file_path' => 'attachments/8iy0SFDLtLnFib19f1PqEReeNFwfDALFBJ0lAJnr.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 39168,
            ],
            [
                'id' => 12,
                'title' => null,
                'description' => null,
                'file_name' => 'Hakim Fidjel - CV.pdf',
                'file_path' => 'users/1/resumes/jnPo3eSLnnjT4NTvvIXs5nm0rf2Iqveac5TVi9bX.pdf',
                'mime_type' => 'application/pdf',
                'file_extension' => 'pdf',
                'file_size' => 849957,
            ],
            [
                'id' => 13,
                'title' => 'Dashboard',
                'description' => null,
                'file_name' => 'Capture d’écran 2025-12-16 220744.png',
                'file_path' => 'attachments/1E5GQATDPCXePOGqBd2CGEVFjMY6rpc26gel6cex.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 135141,
            ],
            [
                'id' => 14,
                'title' => 'Projects list',
                'description' => null,
                'file_name' => 'Capture d’écran 2025-12-16 220757.png',
                'file_path' => 'attachments/gTNhDMkJMBlhitFJbXLSMr0ydirz1UeifoHOiTy2.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 105529,
            ],
            [
                'id' => 15,
                'title' => 'Users list',
                'description' => null,
                'file_name' => 'Capture d’écran 2025-12-16 220808.png',
                'file_path' => 'attachments/mPcjcA7LcgerjibZAfpScAkzS22vlCrnBy0tg7Ha.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 112139,
            ],
            [
                'id' => 16,
                'title' => 'Tickets list',
                'description' => null,
                'file_name' => 'Capture d’écran 2025-12-16 220820.png',
                'file_path' => 'attachments/RBe60ikyAku5HQUZkjFVmuigmDpOa4BxpygfLNRK.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 111673,
            ],
            [
                'id' => 17,
                'title' => 'Contacts list',
                'description' => null,
                'file_name' => 'Capture d’écran 2025-12-16 220832.png',
                'file_path' => 'attachments/aREnlwHhjlKIhwXYbpSmd120JKn14Z3yJsWuNTUW.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 190366,
            ],
            [
                'id' => 18,
                'title' => 'Games grid page',
                'description' => null,
                'file_name' => 'Capture d’écran du 2025-12-17 18-55-54.png',
                'file_path' => 'attachments/4W26u4ApdUNsHbYMNRLhZN1QAuvplUYb2ZOf65h5.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 1271663,
            ],
            [
                'id' => 19,
                'title' => 'Family feud page',
                'description' => null,
                'file_name' => 'Capture d’écran du 2025-12-17 18-56-06.png',
                'file_path' => 'attachments/fdPhcDNbBYITz77CUfqy6wbe0ODYOQUL4Sdzd9LF.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 1230331,
            ],
            [
                'id' => 20,
                'title' => 'Hot seat page',
                'description' => null,
                'file_name' => 'Capture d’écran du 2025-12-17 18-56-17.png',
                'file_path' => 'attachments/ZZW1ivlSRABVp8dSbJQ3RuUdZpVshqshbVdI8xIt.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 1707785,
            ],
            [
                'id' => 21,
                'title' => 'Motus page',
                'description' => null,
                'file_name' => 'Capture d’écran du 2025-12-17 18-56-28.png',
                'file_path' => 'attachments/VTwjEQPv0mYYCSTpqRPhl2fjGGFSvoLODTew5Zfk.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 1092692,
            ],
            [
                'id' => 22,
                'title' => 'Millionaire page',
                'description' => null,
                'file_name' => 'Capture d’écran du 2025-12-17 18-56-49.png',
                'file_path' => 'attachments/m6R2MvZ9gjkxOvDh1pewS196eEdzUuGVHvJ4i08e.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 1207864,
            ],
            [
                'id' => 23,
                'title' => 'English presentation',
                'description' => null,
                'file_name' => 'IMG_8766.jpeg',
                'file_path' => 'attachments/9dtX4pqCLBCPYTX0RFEynLd677Tcqkfx51fug5kO.jpg',
                'mime_type' => 'image/jpeg',
                'file_extension' => 'jpeg',
                'file_size' => 1560906,
            ],
            [
                'id' => 25,
                'title' => 'Projects list',
                'description' => null,
                'file_name' => 'Capture d’écran 2025-12-23 174348.png',
                'file_path' => 'attachments/uhkF1GlhUbt5GtjfjaWsokfxZVflErGy9ZT5RSMk.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 150067,
            ],
            [
                'id' => 26,
                'title' => 'Landing page',
                'description' => null,
                'file_name' => 'Capture d’écran 2026-01-02 à 09.51.00.png',
                'file_path' => 'attachments/X7OqBUHiDcMFNwgDHKyw7iJgSpe7qbFXtnSOR1MH.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 138128,
            ],
            [
                'id' => 27,
                'title' => 'Team section',
                'description' => null,
                'file_name' => 'Capture d’écran 2026-01-02 à 09.51.55.png',
                'file_path' => 'attachments/nlPCqKQhWN5Eg61UkS6TTa8qMnxoFvinF5N4dsYK.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 258866,
            ],
            [
                'id' => 28,
                'title' => 'Planning section',
                'description' => null,
                'file_name' => 'Capture d’écran 2026-01-02 à 09.52.27.png',
                'file_path' => 'attachments/ETLh6gjnTMVdI6WADaVsPuRhT5Y8cbOVms1yjXe0.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 179255,
            ],
            [
                'id' => 29,
                'title' => 'Contact section',
                'description' => null,
                'file_name' => 'Capture d’écran 2026-01-02 à 09.52.33.png',
                'file_path' => 'attachments/e3KuGFaUOcBdyMkQ2B2K0iuiPhchx2eVxi4QMwy1.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 123159,
            ],
            [
                'id' => 30,
                'title' => 'Theme toggle',
                'description' => null,
                'file_name' => 'Capture d’écran 2026-01-02 à 09.52.41.png',
                'file_path' => 'attachments/IDvzsN5K80zatlsH7ag1j2giwBTxMqfksJZhR6nl.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 142959,
            ],
            [
                'id' => 31,
                'title' => 'Our brochure',
                'description' => null,
                'file_name' => 'Capture d’écran 2026-01-02 à 09.53.17.png',
                'file_path' => 'attachments/GRhs6r0v84p4pHqTalLO5VRX5MOJo1ULVBT9lPNj.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 507143,
            ],
            [
                'id' => 32,
                'title' => 'Dashboard',
                'description' => null,
                'file_name' => 'app_home.png',
                'file_path' => 'attachments/a0HZCP3pTu6nKHSOAhG9go6cjmLEyI2Q8Rp5SerC.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 352299,
            ],
            [
                'id' => 34,
                'title' => 'Tickets index',
                'description' => null,
                'file_name' => 'app_tickets.png',
                'file_path' => 'attachments/SMniXBPInadGX7PJEt2NWNC90uR6W1t9lyZXJFMk.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 380933,
            ],
            [
                'id' => 36,
                'title' => 'Knowledge base',
                'description' => null,
                'file_name' => 'app_knowledge.png',
                'file_path' => 'attachments/V3BRjVsxnXFOHMoOfjjihXR4GS57PGk9C9fWDbov.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 394854,
            ],
            [
                'id' => 37,
                'title' => 'Landing page',
                'description' => null,
                'file_name' => 'Landing page.png',
                'file_path' => 'attachments/hoci6yIHrvjxpUYk4uIkAJtGGoZ6DHh5SfHCJaX0.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 91810,
            ],
            [
                'id' => 38,
                'title' => 'Tickets planning',
                'description' => null,
                'file_name' => 'app_schedules.png',
                'file_path' => 'attachments/EhYNVW9m948FTfN7bOSIitR6O91AW1AFoiFDMIri.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 405856,
            ],
            [
                'id' => 39,
                'title' => 'Liste des pokémons',
                'description' => null,
                'file_name' => 'img1.png',
                'file_path' => 'attachments/1GWUNu7UlwSgU3islNWoenWGFPGr68XhRacF8QoF.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 1205532,
            ],
            [
                'id' => 40,
                'title' => 'Filtres disponibles pour les pokémons',
                'description' => null,
                'file_name' => 'img2.png',
                'file_path' => 'attachments/7ZDpYclhBfPXNg3gKASg3HEbyNZraMlSg3RrET0s.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 1046682,
            ],
            [
                'id' => 41,
                'title' => 'Vue détaillée d\un pokémon\'',
                'description' => null,
                'file_name' => 'img3.png',
                'file_path' => 'attachments/TfcjWuALbzQXpUAa4PHFJLzmaRznITyCGj4MiENd.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 616836,
            ],
            [
                'id' => 42,
                'title' => 'Navigation native entre les fiches pokémons.',
                'description' => null,
                'file_name' => 'img4.png',
                'file_path' => 'attachments/bb2hL3Ofc7TJYUOlCcwP5hHjSo96tiPN8QHo6NRy.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 575399,
            ],
            [
                'id' => 43,
                'title' => 'List of components',
                'description' => null,
                'file_name' => 'IMG_3160.png',
                'file_path' => 'attachments/z5T7ZJSdGbmn1UsieILRHy9aYDtano7KroZGWqwp.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 234447,
            ],
            [
                'id' => 44,
                'title' => 'Search feature',
                'description' => null,
                'file_name' => 'IMG_3161.png',
                'file_path' => 'attachments/qY6CPl2qgS7nvx8gs2atnoS1ht56yrW2HKtiyNTo.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 357095,
            ],
            [
                'id' => 45,
                'title' => 'Theme switch',
                'description' => null,
                'file_name' => 'IMG_3162.png',
                'file_path' => 'attachments/zPFwMXQJwlZ6kupD8WlbxeUyQGKgWvr03vhUV85M.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 399693,
            ],
            [
                'id' => 46,
                'title' => 'Searching components',
                'description' => null,
                'file_name' => 'IMG_3163.png',
                'file_path' => 'attachments/YkAMSEETMqgQpXEsRHpLYfvGmpgiePL3iKgIPMJx.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 333334,
            ],
            [
                'id' => 47,
                'title' => 'Accordion component detailed view',
                'description' => null,
                'file_name' => 'IMG_3164.png',
                'file_path' => 'attachments/Kc5qzU7JQ3Wqj1DokLOlthL3XGk2nvhON9h8rJzZ.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 232551,
            ],
            [
                'id' => 48,
                'title' => 'Alert component detailed view',
                'description' => null,
                'file_name' => 'IMG_3165.png',
                'file_path' => 'attachments/dyJsTQWzuvAs7k3GLBOA8HUhyQLEJn8SHSProeFs.png',
                'mime_type' => 'image/png',
                'file_extension' => 'png',
                'file_size' => 342630,
            ],
        ];

        $createdAttachments = [];
        foreach ($attachments as $attData) {
            $created = Attachment::updateOrCreate(
                ['file_path' => $attData['file_path']],
                $attData
            );
            $createdAttachments[$attData['id']] = $created->id;
        }

        // Associer le CV à l'utilisateur
        $resumeAttachment = Attachment::where('file_path', 'like', '%resumes%')->first();
        if ($resumeAttachment) {
            User::where('email', 'hakimfidjel.pro@gmail.com')->update([
                'resume_id' => $resumeAttachment->id,
            ]);
        }

        // Relations Projets <-> Attachments
        $projectAttachmentsMap = [
            'site-vitrine-thyltech' => [
                ['original_id' => 26, 'sort_order' => 0],
                ['original_id' => 27, 'sort_order' => 1],
                ['original_id' => 28, 'sort_order' => 2],
                ['original_id' => 29, 'sort_order' => 3],
                ['original_id' => 30, 'sort_order' => 4],
                ['original_id' => 31, 'sort_order' => 5],
            ],
            'vps-manager' => [
                ['original_id' => 1, 'sort_order' => 0],
                ['original_id' => 2, 'sort_order' => 0],
                ['original_id' => 3, 'sort_order' => 0],
                ['original_id' => 4, 'sort_order' => 0],
                ['original_id' => 5, 'sort_order' => 0],
                ['original_id' => 6, 'sort_order' => 0],
            ],
            'portfolio' => [
                ['original_id' => 7, 'sort_order' => 0],
                ['original_id' => 8, 'sort_order' => 1],
                ['original_id' => 9, 'sort_order' => 2],
                ['original_id' => 10, 'sort_order' => 3],
                ['original_id' => 25, 'sort_order' => 4],
            ],
            'gc-trackr' => [
                ['original_id' => 13, 'sort_order' => 0],
                ['original_id' => 14, 'sort_order' => 0],
                ['original_id' => 15, 'sort_order' => 0],
                ['original_id' => 16, 'sort_order' => 0],
                ['original_id' => 17, 'sort_order' => 0],
            ],
            'english-game-station' => [
                ['original_id' => 18, 'sort_order' => 1],
                ['original_id' => 19, 'sort_order' => 2],
                ['original_id' => 20, 'sort_order' => 3],
                ['original_id' => 21, 'sort_order' => 4],
                ['original_id' => 22, 'sort_order' => 5],
                ['original_id' => 23, 'sort_order' => 0],
            ],
            'ticketack' => [
                ['original_id' => 32, 'sort_order' => 1],
                ['original_id' => 34, 'sort_order' => 2],
                ['original_id' => 36, 'sort_order' => 4],
                ['original_id' => 37, 'sort_order' => 0],
                ['original_id' => 38, 'sort_order' => 3],
            ],
            'pokenative' => [
                ['original_id' => 39, 'sort_order' => 0],
                ['original_id' => 40, 'sort_order' => 1],
                ['original_id' => 41, 'sort_order' => 2],
                ['original_id' => 42, 'sort_order' => 3],
            ],
            'shadcnative' => [
                ['original_id' => 43, 'sort_order' => 0],
                ['original_id' => 44, 'sort_order' => 1],
                ['original_id' => 45, 'sort_order' => 2],
                ['original_id' => 46, 'sort_order' => 3],
                ['original_id' => 47, 'sort_order' => 4],
                ['original_id' => 48, 'sort_order' => 5],
            ],
        ];

        foreach ($projectAttachmentsMap as $slug => $items) {
            $project = Project::where('slug_fr', $slug)->first();
            if (! $project) {
                continue;
            }

            $syncData = [];
            foreach ($items as $item) {
                $actualId = $createdAttachments[$item['original_id']] ?? null;
                if ($actualId) {
                    $syncData[$actualId] = ['sort_order' => $item['sort_order']];
                }
            }

            if (! empty($syncData)) {
                $project->attachments()->sync($syncData);
            }
        }
    }
}
