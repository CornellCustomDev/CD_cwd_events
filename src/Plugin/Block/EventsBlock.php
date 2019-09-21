<?php

namespace Drupal\cwd_events\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\BlockPluginInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides an Events Block containing Localist Data.
 *
 * @Block(
 *   id = "cwd_events_block",
 *   admin_label = @Translation("Events block"),
 *   category = @Translation("Events Block"),
 * )
 */
class EventsBlock extends BlockBase implements BlockPluginInterface {

  /**
   * List of supported format options.
   *
   * @var array
   */
  private $formatOptions = [
    'standard' => 'standard',
    'compact' => 'compact',
    'inline_compact' => 'inline_compact',
    'modern_compact' => 'modern_compact',
    'modern_standard' => 'modern_standard',
    'classic' => 'classic',
    'classic_compact' => 'classic_compact',
  ];

  /**
   * List of supported filter options.
   *
   * @var array
   */
  private $filterOptions = [
    'none' => 'none',
    'group' => 'group',
    'dept' => 'dept',
    'type' => 'type',
  ];

  /**
   * {@inheritdoc}
   */
  public function build() {
    $uuid = \Drupal::service('uuid');
    $id = $uuid->generate();
    $class = ($this->configuration['cwd_events_hidestyling'] === "true") ? '' : 'cwd-events-style' ;
    $teaser = $this->configuration['cwd_events_readmore']
      ? '<a class="cwd_events_readmore ' . $class . '" href='
          . $this->configuration['cwd_events_url'] . '>'
          . $this->t('@readmore', ["@readmore" => $this->configuration['cwd_events_readmore']]) .
        '</a>'
      : '';
    return [
      '#attached' => ['library' => ["cwd_events/cwdeventslib"]],
      '#markup' => $teaser . "<div
                id = 'events-listing-" . $id . "'
                class = 'events-listing " . $class . "'
                data-target = 'events-listing-" . $id . "'
                data-calendarurl = '" . $this->configuration['cwd_events_calendarurl'] . "'
                data-apikey = '" . $this->configuration['cwd_events_apikey'] . "'
                data-format = '" . $this->configuration['cwd_events_format'] . "'
                data-entries = '" . $this->configuration['cwd_events_entries'] . "'
                data-daysahead = '" . $this->configuration['cwd_events_daysahead'] . "'
                data-depts = '" . $this->configuration['cwd_events_depts'] . "'
                data-group = '" . $this->configuration['cwd_events_group'] . "'
                data-keyword = '" . $this->configuration['cwd_events_keyword'] . "'
                data-hidedescription = '" . $this->configuration['cwd_events_hidedescription'] . "'
                data-truncatedescription = '" . $this->configuration['cwd_events_truncatedescription'] . "'
                data-hideimages = '" . $this->configuration['cwd_events_hideimages'] . "'
                data-hideaddcal = '" . $this->configuration['cwd_events_hideaddcal'] . "'
                data-hidepagination = '" . $this->configuration['cwd_events_hidepagination'] . "'
                data-filterby = '" . $this->configuration['cwd_events_filterby'] . "'
                data-wrapperclass = '" . $this->configuration['cwd_events_wrapperclass'] . "'
                data-listclass = '" . $this->configuration['cwd_events_listclass'] . "'
                data-itemclass = '" . $this->configuration['cwd_events_itemclass'] . "'
              ></div>",
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);
    $config = $this->getConfiguration();
    $formatOptions = $this->formatOptions;
    $filterOptions = $this->filterOptions;

    $form['cwd_events_localist_config'] = [
      '#type' => 'fieldset',
      '#title' => $this
        ->t('Localist API Connection settings.'),
      '#collapsible' => TRUE,
      '#collapsed' => TRUE,
    ];

    $form['cwd_events_localist_config']['cwd_events_calendarurl'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Calendar url'),
      '#description' => $this->t('The localist calendar url.'),
      '#default_value' => isset($config['cwd_events_calendarurl']) ? $config['cwd_events_calendarurl'] : '//events.cornell.edu/api/2.1/events',
    ];

    $form['cwd_events_localist_config']['cwd_events_apikey'] = [
      '#type' => 'textfield',
      '#title' => $this->t('API key'),
      '#description' => $this->t('The localist API Key.'),
      '#default_value' => isset($config['cwd_events_apikey']) ? $config['cwd_events_apikey'] : 'KLhy2GtuSAGirYGY',
    ];

    $form['cwd_events_display_config'] = [
      '#type' => 'fieldset',
      '#title' => $this
        ->t('Build An Events Widget'),
      '#collapsible' => TRUE,
      '#collapsed' => TRUE,
    ];

    $form['cwd_events_display_config']['cwd_events_format'] = [
      '#type' => 'select',
      '#title' => $this->t('Template'),
      '#description' => $this->t('Choices are: standard (default), compact (omit thumbnail, type and end time), archive (past events in reverse order), calendar (date on left)'),
      '#options' => $formatOptions,
      '#default_value' => isset($config['cwd_events_format']) ? $config['cwd_events_format'] : 'standard',
    ];

    $form['cwd_events_display_config']['cwd_events_entries'] = [
      '#type' => 'number',
      '#title' => $this->t('Number of Results'),
      '#description' => $this->t('Max number of entries to display, up to 50'),
      '#default_value' => isset($config['cwd_events_entries']) ? $config['cwd_events_entries'] : 3,
    ];

    $form['cwd_events_display_config']['cwd_events_daysahead'] = [
      '#type' => 'number',
      '#title' => $this->t('Days Ahead'),
      '#description' => $this->t('Up to 365. Set to negative for archive events.'),
      '#default_value' => isset($config['cwd_events_daysahead']) ? $config['cwd_events_daysahead'] : 365,
    ];

    $form['cwd_events_display_config']['cwd_events_depts'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Departments'),
      '#description' => $this->t('The department to include by ID. A comma seperated list of groups can be used.'),
      '#default_value' => isset($config['cwd_events_depts']) ? $config['cwd_events_depts'] : 0,
    ];

    $form['cwd_events_display_config']['cwd_events_group'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Groups'),
      '#description' => $this->t('Localist filter option'),
      '#default_value' => isset($config['cwd_events_group']) ? $config['cwd_events_group'] : 0,
    ];

    $form['cwd_events_display_config']['cwd_events_keyword'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Keyword'),
      '#description' => $this->t('Display events with a specific tag or keyword (can be used alone or in combination with "depts" and "group")'),
      '#default_value' => isset($config['cwd_events_keyword']) ? $config['cwd_events_keyword'] : FALSE,
    ];

    $form['cwd_events_display_options'] = [
      '#type' => 'fieldset',
      '#title' => $this
        ->t('Display Options'),
      '#collapsible' => TRUE,
      '#collapsed' => TRUE,
    ];

    // @todo add option for "Widget Type" list or row.
    $form['cwd_events_display_options']['cwd_events_readmore'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Read More Title'),
      '#description' => $this->t('Read More Title to be used with readmore url to link to the events page. Leave blank to remove from display.'),
      '#default_value' => isset($config['cwd_events_readmore']) ? $config['cwd_events_readmore'] : 'Read More',
    ];

    $form['cwd_events_display_options']['cwd_events_url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Read More URL'),
      '#description' => $this->t('The Read More URL, provides href to main events page used in read more title.'),
      '#default_value' => isset($config['cwd_events_url']) ? $config['cwd_events_url'] : '/events',
    ];

    $form['cwd_events_display_options']['cwd_events_filterby'] = [
      '#type' => 'select',
      '#title' => $this->t('Expose filters'),
      '#description' => $this->t('Exposes filters buttons for: group (default), dept(department), and type. If none is selected filters will not be exposed.'),
      '#options' => $filterOptions,
      '#default_value' => isset($config['cwd_events_filterby']) ? $config['cwd_events_filterby'] : 'group',
    ];

    $form['cwd_events_display_options']['cwd_events_truncatedescription'] = [
      '#type' => 'number',
      '#title' => $this->t('Description excerpt length'),
      '#description' => $this->t('The character length of the description. Leave blank for full description.'),
      '#default_value' => isset($config['cwd_events_truncatedescription']) ? $config['cwd_events_truncatedescription'] : 150,
    ];

    $form['cwd_events_display_options']['cwd_events_hidedescription'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Hide Descriptions'),
      '#return_value' => 'true',
      '#default_value' => isset($config['cwd_events_hidedescription']) ? $config['cwd_events_hidedescription'] : 'false',
    ];

    $form['cwd_events_display_options']['cwd_events_hideimages'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Hide Event Images'),
      '#return_value' => 'true',
      '#default_value' => isset($config['cwd_events_hideimages']) ? $config['cwd_events_hideimages'] : 'false',
    ];

    $form['cwd_events_display_options']['cwd_events_hideaddcal'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Hide Calendar links'),
      '#return_value' => 'true',
      '#default_value' => isset($config['cwd_events_hideaddcal']) ? $config['cwd_events_hideaddcal'] : 'false',
    ];

    $form['cwd_events_display_options']['cwd_events_hidepagination'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Hide Pagination'),
      '#return_value' => 'true',
      '#default_value' => isset($config['cwd_events_hidepagination']) ? $config['cwd_events_hidepagination'] : 'false',
    ];

    $form['cwd_events_display_options']['cwd_events_hidestyling'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Hide Styling'),
      '#return_value' => 'true',
      '#default_value' => isset($config['cwd_events_hidestyling']) ? $config['cwd_events_hidestyling'] : 'false',
    ];

    $form['cwd_events_display_options']['cwd_events_wrapperclass'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Add class to events wrapper'),
      '#description' => $this->t('example:cwd-card-grid three-card'),
      '#default_value' => isset($config['cwd_events_wrapperclass']) ? $config['cwd_events_wrapperclass'] : '',
    ];

    $form['cwd_events_display_options']['cwd_events_listclass'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Add class to events list'),
      '#description' => $this->t('example:cards'),
      '#default_value' => isset($config['cwd_events_listclass']) ? $config['cwd_events_listclass'] : '',
    ];

    $form['cwd_events_display_options']['cwd_events_itemclass'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Add class to event list item'),
      '#description' => $this->t('example:card'),
      '#default_value' => isset($config['cwd_events_itemclass']) ? $config['cwd_events_itemclass'] : '',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    parent::blockSubmit($form, $form_state);
    $values = $form_state->getValues();
    $formatOptions = $this->formatOptions;
    $this->configuration['cwd_events_calendarurl'] = $values['cwd_events_localist_config']['cwd_events_calendarurl'];
    $this->configuration['cwd_events_apikey'] = $values['cwd_events_localist_config']['cwd_events_apikey'];

    $this->configuration['cwd_events_format'] = $formatOptions[$values['cwd_events_display_config']['cwd_events_format']];
    $this->configuration['cwd_events_entries'] = $values['cwd_events_display_config']['cwd_events_entries'];
    $this->configuration['cwd_events_daysahead'] = $values['cwd_events_display_config']['cwd_events_daysahead'];
    $this->configuration['cwd_events_depts'] = $values['cwd_events_display_config']['cwd_events_depts'];
    $this->configuration['cwd_events_group'] = $values['cwd_events_display_config']['cwd_events_group'];
    $this->configuration['cwd_events_keyword'] = $values['cwd_events_display_config']['cwd_events_keyword'];

    $this->configuration['cwd_events_readmore'] = $values['cwd_events_display_options']['cwd_events_readmore'];
    $this->configuration['cwd_events_url'] = $values['cwd_events_display_options']['cwd_events_url'];
    $this->configuration['cwd_events_filterby'] = $values['cwd_events_display_options']['cwd_events_filterby'];
    $this->configuration['cwd_events_truncatedescription'] = $values['cwd_events_display_options']['cwd_events_truncatedescription'];
    $this->configuration['cwd_events_hidedescription'] = $values['cwd_events_display_options']['cwd_events_hidedescription'];
    $this->configuration['cwd_events_hideimages'] = $values['cwd_events_display_options']['cwd_events_hideimages'];
    $this->configuration['cwd_events_hideaddcal'] = $values['cwd_events_display_options']['cwd_events_hideaddcal'];
    $this->configuration['cwd_events_hidepagination'] = $values['cwd_events_display_options']['cwd_events_hidepagination'];
    $this->configuration['cwd_events_hidestyling'] = $values['cwd_events_display_options']['cwd_events_hidestyling'];
    $this->configuration['cwd_events_wrapperclass'] = $values['cwd_events_display_options']['cwd_events_wrapperclass'];
    $this->configuration['cwd_events_listclass'] = $values['cwd_events_display_options']['cwd_events_listclass'];
    $this->configuration['cwd_events_itemclass'] = $values['cwd_events_display_options']['cwd_events_itemclass'];
  }

}
